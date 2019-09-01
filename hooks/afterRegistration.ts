export async function afterRegistration({ Vue, config, store, isServer }) {
  if (isServer && !store.state['vsf-yotpo'].totals) {
    await store.dispatch('vsf-yotpo/loadTotals');
  }
}
