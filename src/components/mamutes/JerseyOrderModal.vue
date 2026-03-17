<script setup lang="ts">
  import type { Jersey, JerseyOrder } from '@/entities/types'
  import { computed, reactive, ref } from 'vue'

  const props = defineProps<{
    jersey: Jersey
  }>()

  const emit = defineEmits<{
    (e: 'close'): void
  }>()

  const submitting = ref(false)
  const success = ref(false)
  const snack = ref(false)

  const form = reactive({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    size: '',
    quantity: 1,
    name_on_jersey: '',
    number_on_jersey: '',
    notes: '',
  })

  const sizes = computed(() => {
    const raw = props.jersey.sizes_available?.length
      ? props.jersey.sizes_available
      : ['PP', 'P', 'M', 'G', 'GG', 'XGG']

    const normalized = raw
      .map(s => s.trim().toUpperCase())
      .filter(Boolean)

    return [...new Set(normalized)]
  })

  const canSubmit = computed(() => {
    return (
      form.customer_name.trim().length > 0
      && form.customer_email.trim().length > 0
      && form.size.length > 0
      && !submitting.value
    )
  })

  const total = computed(() => {
    const q = Number(form.quantity || 1)
    return (props.jersey.price || 0) * q
  })

  const whatsappPhone = computed(() => '+5598988123003')

  function buildWhatsAppOrderUrl (order: JerseyOrder) {
    const lines: string[] = [
      'Olá! Quero pedir uma jersey do Mamutes F.A.',
      '',
      `Jersey: ${order.jersey_name}`,
      `Tamanho: ${order.size}`,
      `Quantidade: ${order.quantity}`,
    ]

    if (order.name_on_jersey) lines.push(`Nome na camisa: ${order.name_on_jersey}`)
    if (typeof order.number_on_jersey === 'number') lines.push(`Número na camisa: ${order.number_on_jersey}`)
    if (order.notes) lines.push(`Obs: ${order.notes}`)

    lines.push(
      '',
      `Nome: ${order.customer_name}`,
      `Email: ${order.customer_email}`,
      ...(order.customer_phone ? [`Telefone: ${order.customer_phone}`] : []),
    )

    const text = encodeURIComponent(lines.join('\n'))
    return `https://wa.me/${whatsappPhone.value}?text=${text}`
  }

  function close () {
    emit('close')
  }

  function persistOrder (order: JerseyOrder) {
    try {
      const key = 'mamutes_jersey_orders'
      const current = JSON.parse(localStorage.getItem(key) || '[]') as JerseyOrder[]
      current.push(order)
      localStorage.setItem(key, JSON.stringify(current))
    } catch {
    // ignore
    }
  }

  async function submit () {
    submitting.value = true

    const order: JerseyOrder = {
      jersey_id: props.jersey.id,
      jersey_name: props.jersey.name,
      customer_name: form.customer_name,
      customer_email: form.customer_email,
      customer_phone: form.customer_phone || undefined,
      size: form.size,
      quantity: Number(form.quantity || 1),
      name_on_jersey: form.name_on_jersey || undefined,
      number_on_jersey: form.number_on_jersey ? Number(form.number_on_jersey) : undefined,
      notes: form.notes || undefined,
      status: 'received',
      created_at: new Date().toISOString(),
    }

    const whatsappUrl = buildWhatsAppOrderUrl(order)
    const tab = window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    if (!tab) snack.value = true

    await new Promise(r => window.setTimeout(r, 450))
    persistOrder(order)

    submitting.value = false
    success.value = true
    snack.value = true
  }
</script>

<template>
  <v-dialog max-width="960" :model-value="true" @update:model-value="close">
    <v-card class="order-dialog" rounded="xl">
      <template v-if="success">
        <v-card-text class="py-12 px-6">
          <div class="flex flex-col items-center text-center">
            <div class="success-icon mb-4">
              <v-icon color="success" size="34">mdi-check-circle</v-icon>
            </div>

            <h3 class="text-h5 font-weight-bold mb-2">Pedido enviado com sucesso</h3>

            <p class="text-medium-emphasis max-w-[360px]">
              Abrimos o WhatsApp com os dados do seu pedido da
              <strong>{{ props.jersey.name }}</strong>.
            </p>

            <v-btn
              class="mt-6"
              color="primary"
              rounded="lg"
              size="large"
              variant="flat"
              @click="close"
            >
              Fechar
            </v-btn>
          </div>
        </v-card-text>
      </template>

      <template v-else>
        <div class="order-layout">
          <!-- COLUNA ESQUERDA -->
          <aside class="product-panel">
            <div class="product-image-wrap">
              <img
                v-if="props.jersey.image_url"
                :alt="props.jersey.name"
                class="product-image"
                :src="props.jersey.image_url"
              >
              <div v-else class="product-image-empty">
                <v-icon color="medium-emphasis" size="74">mdi-tshirt-crew</v-icon>
              </div>
            </div>

            <div class="mt-5">
              <div class="d-flex align-start justify-space-between ga-3">
                <h3 class="product-title">{{ props.jersey.name }}</h3>
                <div class="product-price">
                  R$ {{ (props.jersey.price ?? 0).toFixed(2) }}
                </div>
              </div>

              <p v-if="props.jersey.description" class="product-description mt-3">
                {{ props.jersey.description }}
              </p>

              <div class="mt-5">
                <div class="section-mini-label mb-2">Tamanho</div>

                <div class="size-grid">
                  <button
                    v-for="size in sizes"
                    :key="size"
                    class="size-chip"
                    :class="{ active: form.size === size }"
                    type="button"
                    @click="form.size = size"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>

              <div class="price-box mt-6">
                <div class="text-caption text-medium-emphasis">Valor unitário</div>
                <div class="text-h6 font-weight-bold">
                  R$ {{ (props.jersey.price ?? 0).toFixed(2) }}
                </div>
              </div>
            </div>
          </aside>

          <!-- COLUNA DIREITA -->
          <section class="form-panel">
            <div class="form-header">
              <div>
                <div class="text-overline text-primary font-weight-bold">Mamutes F.A.</div>
                <h2 class="form-title">Finalizar pedido</h2>
                <p class="form-subtitle">
                  Preencha seus dados e personalize sua jersey. Ao confirmar,
                  vamos abrir o WhatsApp com a mensagem pronta.
                </p>
              </div>

              <v-btn
                class="close-btn"
                icon
                size="small"
                variant="text"
                @click="close"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>

            <form class="mt-6" @submit.prevent="submit">
              <!-- BLOCO 1 -->
              <div class="form-block">
                <div class="block-title">
                  <v-icon class="mr-2" size="18">mdi-account-outline</v-icon>
                  Seus dados
                </div>

                <div class="grid-form two-cols">
                  <div class="field">
                    <div class="field-label">Nome completo *</div>
                    <v-text-field
                      v-model="form.customer_name"
                      density="comfortable"
                      hide-details="auto"
                      placeholder="Digite seu nome"
                      required
                      rounded="lg"
                      variant="outlined"
                    />
                  </div>

                  <div class="field">
                    <div class="field-label">Email *</div>
                    <v-text-field
                      v-model="form.customer_email"
                      density="comfortable"
                      hide-details="auto"
                      placeholder="Digite seu email"
                      required
                      rounded="lg"
                      type="email"
                      variant="outlined"
                    />
                  </div>

                  <div class="field">
                    <div class="field-label">Telefone</div>
                    <v-text-field
                      v-model="form.customer_phone"
                      density="comfortable"
                      hide-details="auto"
                      placeholder="(98) 00000-0000"
                      rounded="lg"
                      variant="outlined"
                    />
                  </div>

                  <div>
                    <div class="block-field-label">Tamanho *</div>
                    <div class="size-grid size-grid--form">
                      <button
                        v-for="size in sizes"
                        :key="`form-${size}`"
                        class="size-chip"
                        :class="{ active: form.size === size }"
                        type="button"
                        @click="form.size = size"
                      >
                        {{ size }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- BLOCO 2 -->
              <div class="form-block mt-5">
                <div class="block-title">
                  <v-icon class="mr-2" size="18">mdi-tshirt-crew-outline</v-icon>
                  Personalização
                </div>

                <div class="grid-form three-cols">
                  <div class="field">
                    <div class="field-label">Quantidade</div>
                    <v-text-field
                      v-model="form.quantity"
                      density="comfortable"
                      hide-details="auto"
                      min="1"
                      placeholder="1"
                      rounded="lg"
                      type="number"
                      variant="outlined"
                    />
                  </div>

                  <div class="field">
                    <div class="field-label">Nome na camisa</div>
                    <v-text-field
                      v-model="form.name_on_jersey"
                      density="comfortable"
                      hide-details="auto"
                      placeholder="Ex: SILVA"
                      rounded="lg"
                      variant="outlined"
                    />
                  </div>

                  <div class="field">
                    <div class="field-label">Número na camisa</div>
                    <v-text-field
                      v-model="form.number_on_jersey"
                      density="comfortable"
                      hide-details="auto"
                      placeholder="Ex: 10"
                      rounded="lg"
                      type="number"
                      variant="outlined"
                    />
                  </div>
                </div>

                <div class="mt-4">
                  <div class="field">
                    <div class="field-label">Observações</div>
                    <v-textarea
                      v-model="form.notes"
                      auto-grow
                      density="comfortable"
                      hide-details="auto"
                      placeholder="Alguma observação sobre seu pedido?"
                      rounded="lg"
                      rows="3"
                      variant="outlined"
                    />
                  </div>
                </div>
              </div>

              <!-- RODAPÉ -->
              <div class="footer-box mt-6">
                <div class="total-card">
                  <div class="text-caption text-medium-emphasis mb-1">Total do pedido</div>
                  <div class="total-value">R$ {{ total.toFixed(2) }}</div>
                </div>

                <div class="footer-actions">
                  <v-btn
                    :disabled="submitting"
                    rounded="lg"
                    variant="tonal"
                    @click="close"
                  >
                    Cancelar
                  </v-btn>

                  <v-btn
                    color="primary"
                    :disabled="!canSubmit"
                    :loading="submitting"
                    rounded="lg"
                    size="large"
                    type="submit"
                    variant="flat"
                  >
                    <v-icon start>mdi-whatsapp</v-icon>
                    Confirmar no WhatsApp
                  </v-btn>
                </div>
              </div>
            </form>
          </section>
        </div>
      </template>
    </v-card>

    <v-snackbar v-model="snack" color="surface" location="top" timeout="2500">
      <div>
        <div class="font-weight-bold">Pedido enviado!</div>
        <div class="text-body-2">Se não abriu, verifique o bloqueio de pop-up.</div>
      </div>
    </v-snackbar>
  </v-dialog>
</template>

<style scoped>
.order-dialog {
  background:
    linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)),
    rgba(var(--v-theme-surface), 1);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.order-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  min-height: 680px;
}

.product-panel {
  padding: 24px;
  background:
    linear-gradient(180deg, rgba(var(--v-theme-primary), 0.08), rgba(255,255,255,0.02));
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.product-image-wrap {
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  aspect-ratio: 1 / 1;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-image-empty {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.product-title {
  font-size: 1.6rem;
  line-height: 1.15;
  font-weight: 800;
}

.product-price {
  font-size: 1.4rem;
  font-weight: 800;
  color: rgb(var(--v-theme-primary));
  white-space: nowrap;
}

.product-description {
  font-size: 0.95rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.68);
}

.section-mini-label {
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 700;
}

.size-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.size-grid--form {
  gap: 12px;
}

.block-field-label {
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 10px;
}

.field-label {
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 10px;
}

.size-chip {
  min-width: 52px;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.85);
  font-size: 0.85rem;
  font-weight: 700;
  transition: all 0.2s ease;
}

.size-chip:hover {
  transform: translateY(-1px);
  border-color: rgba(var(--v-theme-primary), 0.45);
  background: rgba(var(--v-theme-primary), 0.08);
}

.size-chip.active {
  background: rgba(var(--v-theme-primary), 0.18);
  border-color: rgba(var(--v-theme-primary), 0.75);
  color: white;
  box-shadow: 0 0 0 1px rgba(var(--v-theme-primary), 0.15) inset;
}

.price-box {
  padding: 16px;
  border-radius: 16px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
}

.form-panel {
  padding: 28px;
  background:
    radial-gradient(circle at top right, rgba(var(--v-theme-primary), 0.06), transparent 28%),
    rgba(255,255,255,0.01);
}

.form-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.form-title {
  font-size: 1.9rem;
  line-height: 1.1;
  font-weight: 800;
  margin-top: 4px;
}

.form-subtitle {
  margin-top: 8px;
  max-width: 620px;
  font-size: 0.98rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.68);
}

.close-btn {
  flex-shrink: 0;
}

.form-block {
  padding: 18px;
  border-radius: 18px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(8px);
}

.block-title {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-weight: 800;
  font-size: 0.98rem;
}

.grid-form {
  display: grid;
  gap: 16px;
}

.two-cols {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.three-cols {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.footer-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px;
  border-radius: 18px;
  background: rgba(var(--v-theme-primary), 0.06);
  border: 1px solid rgba(var(--v-theme-primary), 0.18);
}

.total-card {
  min-width: 180px;
}

.total-value {
  font-size: 1.8rem;
  line-height: 1.1;
  font-weight: 900;
}

.footer-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.success-icon {
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: rgba(var(--v-theme-success), 0.12);
  border: 1px solid rgba(var(--v-theme-success), 0.18);
}

:deep(.v-field) {
  border-radius: 14px !important;
}

:deep(.v-field--variant-outlined) {
  --v-field-border-opacity: 1;
}

:deep(.v-field--variant-outlined .v-field__outline) {
  opacity: 1;
}

:deep(.v-field--variant-outlined .v-field__outline__start),
:deep(.v-field--variant-outlined .v-field__outline__notch),
:deep(.v-field--variant-outlined .v-field__outline__end) {
  border-color: rgba(var(--v-theme-on-surface), 0.62) !important;
}

:deep(.v-field--variant-outlined:hover .v-field__outline__start),
:deep(.v-field--variant-outlined:hover .v-field__outline__notch),
:deep(.v-field--variant-outlined:hover .v-field__outline__end) {
  border-color: rgba(var(--v-theme-on-surface), 0.78) !important;
}

:deep(.v-field--focused.v-field--variant-outlined .v-field__outline__start),
:deep(.v-field--focused.v-field--variant-outlined .v-field__outline__notch),
:deep(.v-field--focused.v-field--variant-outlined .v-field__outline__end) {
  border-color: rgba(var(--v-theme-primary), 1) !important;
}

:deep(.v-field--variant-outlined .v-field__overlay) {
  background: rgba(var(--v-theme-surface), 0.12) !important;
}

@media (max-width: 960px) {
  .order-layout {
    grid-template-columns: 1fr;
  }

  .product-panel {
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
}

@media (max-width: 700px) {
  .form-panel {
    padding: 20px;
  }

  .product-panel {
    padding: 20px;
  }

  .two-cols,
  .three-cols {
    grid-template-columns: 1fr;
  }

  .footer-box {
    flex-direction: column;
    align-items: stretch;
  }

  .footer-actions {
    justify-content: stretch;
  }

  .footer-actions :deep(.v-btn) {
    width: 100%;
  }

  .form-title {
    font-size: 1.55rem;
  }
}
</style>
