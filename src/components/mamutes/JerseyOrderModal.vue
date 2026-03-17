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
    return props.jersey.sizes_available?.length ? props.jersey.sizes_available : ['PP', 'P', 'M', 'G', 'GG', 'XGG']
  })

  const total = computed(() => {
    const q = Number(form.quantity || 1)
    return (props.jersey.price || 0) * q
  })

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

    await new Promise(r => window.setTimeout(r, 450))
    persistOrder(order)

    submitting.value = false
    success.value = true
    snack.value = true
  }
</script>

<template>
  <v-dialog max-width="720" :model-value="true" @update:model-value="close">
    <v-card rounded="lg">
      <template v-if="success">
        <v-card-text class="py-10">
          <div class="flex flex-col items-center text-center">
            <div class="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <v-icon class="text-green-500" size="32">mdi-check-circle</v-icon>
            </div>
            <h3 class="font-oswald text-xl font-bold text-foreground">Pedido Enviado!</h3>
            <p class="mt-2 text-sm text-muted-foreground max-w-xs">
              Seu pedido da <strong>{{ props.jersey.name }}</strong> foi recebido. Entraremos em contato em breve.
            </p>
            <v-btn class="mt-6" color="primary" variant="flat" @click="close">Fechar</v-btn>
          </div>
        </v-card-text>
      </template>

      <template v-else>
        <v-card-title class="font-oswald text-xl">Pedir: {{ props.jersey.name }}</v-card-title>
        <v-card-text>
          <form class="space-y-4" @submit.prevent="submit">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <v-text-field
                v-model="form.customer_name"
                density="comfortable"
                label="Nome completo *"
                required
                variant="outlined"
              />
              <v-text-field
                v-model="form.customer_email"
                density="comfortable"
                label="Email *"
                required
                type="email"
                variant="outlined"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <v-text-field
                v-model="form.customer_phone"
                density="comfortable"
                label="Telefone"
                variant="outlined"
              />
              <v-select
                v-model="form.size"
                density="comfortable"
                :items="sizes"
                label="Tamanho *"
                required
                variant="outlined"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <v-text-field
                v-model="form.quantity"
                density="comfortable"
                label="Quantidade"
                min="1"
                type="number"
                variant="outlined"
              />
              <v-text-field
                v-model="form.name_on_jersey"
                density="comfortable"
                label="Nome na camisa"
                placeholder="Ex: SILVA"
                variant="outlined"
              />
              <v-text-field
                v-model="form.number_on_jersey"
                density="comfortable"
                label="Número na camisa"
                placeholder="Ex: 10"
                type="number"
                variant="outlined"
              />
            </div>

            <v-textarea
              v-model="form.notes"
              density="comfortable"
              label="Observações"
              placeholder="Alguma observação sobre seu pedido?"
              rows="3"
              variant="outlined"
            />

            <div class="flex items-center justify-between pt-2">
              <span class="text-lg font-oswald font-bold">Total: R$ {{ total.toFixed(2) }}</span>
              <v-btn
                color="primary"
                :disabled="submitting || form.size.length === 0"
                type="submit"
                variant="flat"
              >
                <template v-if="submitting">
                  <v-progress-circular class="mr-2" indeterminate size="18" width="2" />
                  Enviando...
                </template>
                <template v-else>
                  Confirmar Pedido
                </template>
              </v-btn>
            </div>
          </form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="close">Cancelar</v-btn>
        </v-card-actions>
      </template>
    </v-card>

    <v-snackbar v-model="snack" color="surface" location="top" timeout="2500">
      <div class="font-inter">
        <div class="font-semibold text-foreground">Pedido enviado!</div>
        <div class="text-sm text-muted-foreground">Entraremos em contato em breve.</div>
      </div>
    </v-snackbar>
  </v-dialog>
</template>
