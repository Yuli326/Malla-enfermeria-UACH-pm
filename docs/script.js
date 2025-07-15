document.querySelectorAll('.ramo').forEach(ramo => {
  ramo.addEventListener('click', () => {
    // Alternar aprobado
    ramo.classList.toggle('aprobado');

    // Recorremos todos los ramos para ver cuáles se deben desbloquear
    document.querySelectorAll('.ramo').forEach(objetivo => {
      const requisitos = [];

      // Buscar ramos que apuntan a este como objetivo con su data-abre
      document.querySelectorAll('.ramo').forEach(padre => {
        const ids = (padre.dataset.abre || '').split(' ').filter(Boolean);
        if (ids.includes(objetivo.dataset.id)) {
          requisitos.push(padre.dataset.id);
        }
      });

      if (requisitos.length === 0) return;

      // Si todos los ramos que lo habilitan están aprobados
      const habilitado = requisitos.every(id =>
        document.querySelector(`.ramo[data-id="${id}"]`)?.classList.contains('aprobado')
      );

      if (habilitado) {
        objetivo.classList.add('desbloqueado');
      } else {
        objetivo.classList.remove('desbloqueado');
      }
    });
  });
});
