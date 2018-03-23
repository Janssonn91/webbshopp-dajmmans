class Materiel extends REST {
  constructor(result){
    super(result);
    Materiel.title = 'Materiel';
    Materiel.breadText = `
    Är du en erfaren eller nybörjare? Vi har allt materiel som du kan tänkas behöva till dom bästa priserna på webben.
    `;
    Materiel.img = '/img/materiel.jpg';
    Materiel.icon = `<i class="fas fa-quidditch awesomeness"></i>`;
  }

}
