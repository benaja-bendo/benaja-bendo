/**
 * Bouton d'impression du CV — le SECOND et dernier JavaScript de ce site.
 *
 * Pourquoi il existe : la page /cv est écrite pour être imprimée ou enregistrée
 * en PDF, et la seule façon de le faire était une indication clavier
 * (Cmd/Ctrl + P). C'est une consigne pour qui sait déjà. Or le lecteur visé ici
 * est souvent un recruteur ou un RH, pas un développeur : lui demander un
 * raccourci clavier pour récupérer un CV, c'est lui demander de renoncer.
 *
 * L'invariant n°3 impose de justifier chaque fichier JS avant de l'ajouter.
 * Le calcul, ici :
 *   - il n'est chargé QUE sur /cv, pas sur les 27 autres pages ;
 *   - il est chargé avec `defer` — contrairement à theme.js, il ne touche pas
 *     au rendu, donc il n'a aucune raison de le bloquer ;
 *   - il pèse quelques centaines d'octets et vient du même domaine ;
 *   - `window.print()` n'a pas d'équivalent en CSS ni en HTML. Il n'existe
 *     aucune façon de déclencher l'impression sans script.
 *
 * Ce qu'il ne fait PAS : générer un PDF. La mise en page d'impression vit
 * entièrement dans global.css (@page + @media print) ; ce fichier ne fait
 * qu'ouvrir la boîte de dialogue du navigateur. Si le script échoue ou n'est
 * jamais exécuté, l'indication clavier reste affichée et le résultat est
 * identique — c'est pour ça qu'elle n'est pas retirée de la page.
 */
(() => {
  const racine = document.documentElement;

  const cabler = () => {
    const boutons = document.querySelectorAll('[data-imprimer]');
    if (boutons.length === 0) return;

    for (const bouton of boutons) {
      bouton.addEventListener('click', () => {
        // Certains navigateurs très verrouillés refusent l'appel. On ne peut
        // pas le rattraper utilement — l'indication clavier est toujours là —
        // mais on évite qu'une exception remonte dans la console d'un visiteur.
        try {
          window.print();
        } catch {
          /* la boîte de dialogue reste accessible au clavier */
        }
      });
    }

    // Même règle que la bascule de thème : sans script, ces boutons ne feraient
    // rien, donc le CSS les masque tant que cet attribut n'est pas posé.
    // Pas de bouton mort.
    racine.setAttribute('data-cv-pret', '');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cabler);
  } else {
    cabler();
  }
})();
