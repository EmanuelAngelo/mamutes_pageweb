<script setup lang="ts">
  import AthletesSection from '@/components/mamutes/AthletesSection.vue'
  import BoardSection from '@/components/mamutes/BoardSection.vue'
  import ChampionshipsSection from '@/components/mamutes/ChampionshipsSection.vue'
  import FooterSection from '@/components/mamutes/Footer.vue'
  import HeroSection from '@/components/mamutes/HeroSection.vue'
  import JerseysSection from '@/components/mamutes/JerseysSection.vue'
  import Navbar from '@/components/mamutes/Navbar.vue'
  import SponsorsSection from '@/components/mamutes/SponsorsSection.vue'
  import SystemSection from '@/components/mamutes/SystemSection.vue'
</script>

<template>
  <div class="min-h-screen font-inter">
    <Navbar />
    <HeroSection />
    <ChampionshipsSection />
    <BoardSection />
    <AthletesSection />
    <JerseysSection />
    <SystemSection />
    <SponsorsSection />
    <FooterSection />
  </div>
</template>
