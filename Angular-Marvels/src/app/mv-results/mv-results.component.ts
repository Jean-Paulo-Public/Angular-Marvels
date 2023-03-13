import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mv-results',
  templateUrl: './mv-results.component.html',
  styleUrls: ['./mv-results.component.css']
})
export class MvResultsComponent {
  @Input() isDarkTheme = false;

  tabs = [
    {
      title: 'Homem de ferro',
      content: [
        'O Homem de Ferro é um super-herói dos quadrinhos da Marvel Comics. Ele foi criado por Stan Lee, Larry Lieber, Don Heck e Jack Kirby e sua primeira aparição foi em Tales of Suspense #39 em 1963.',
        'O personagem é o alter ego de Tony Stark, um gênio bilionário e filantropo que constrói uma armadura tecnologicamente avançada para se tornar o Homem de Ferro. A armadura lhe dá força sobre-humana, capacidade de voo e uma variedade de armas.',
        'Tony Stark é conhecido por sua inteligência e habilidades como inventor e engenheiro. Ele também é famoso por seu estilo de vida extravagante e personalidade confiante.',
        'Ao longo dos anos, o Homem de Ferro enfrentou muitos vilões poderosos e participou de várias equipes de super-heróis, incluindo os Vingadores.'
      ]
    },
    {
      title: 'Hulk',
      content: [
        'Hulk é um personagem de quadrinhos do gênero super-herói, propriedade da Marvel Comics. Ele foi criado por Stan Lee e Jack Kirby e sua primeira aparição foi em The Incredible Hulk #1 em maio de 1962.',
        'O personagem é o alter ego do cientista Bruce Banner, que após ser exposto a altas doses de radiação gama se transforma no gigante verde quando fica com raiva. Hulk é conhecido por sua força incrível e resistência.',
        'Recentemente, a Marvel Comics lançou uma nova série de quadrinhos de terror estrelada pelo Hulk como um caçador de monstros. Nesta série, o gigante verde enfrenta uma horda de monstros do Universo Marvel.'
      ]
    },
    {
      title: 'Thor',
      content: [
        'Thor é um personagem de quadrinhos do gênero super-herói, propriedade da Marvel Comics. Ele foi criado por Jack Kirby, Stan Lee e Larry Lieber e sua primeira aparição foi em Journey into Mystery #83 em agosto de 1962.',
        'O personagem é baseado no deus nórdico Thor e é o príncipe de Asgard. Ele é conhecido por sua força incrível e pelo uso do martelo Mjolnir.',
        'A Marvel Comics tem publicado várias séries de quadrinhos estreladas pelo Thor ao longo dos anos. Atualmente, a série Thor (2020 - Presente) está sendo publicada'
      ]
    },
    {
      title: 'Viúva Negra',
      content: [
        'Viúva Negra é uma super-heroína dos quadrinhos da Marvel Comics. Ela foi criada por Stan Lee, Don Rico e Don Heck e sua primeira aparição foi em Tales of Suspense #52 em abril de 1964.',
        'O personagem é o alter ego de Natasha Romanoff, uma espiã russa treinada pela KGB que se tornou agente da S.H.I.E.L.D. e membro dos Vingadores. Ela é conhecida por suas habilidades em combate corpo a corpo e espionagem.',
        'Ao longo dos anos, a Viúva Negra enfrentou muitos vilões poderosos e participou de várias equipes de super-heróis. Em 2021, ela ganhou seu próprio filme solo no Universo Cinematográfico Marvel.'
      ]
    },
    {
      title: 'Capitão América',
      content: [
        'Capitão América é um super-herói dos quadrinhos da Marvel Comics. Ele foi criado por Joe Simon e Jack Kirby e sua primeira aparição foi em Captain America Comics #1 em março de 1941.',
        'O personagem é o alter ego de Steve Rogers, um jovem franzino que se torna um supersoldado depois de receber um soro experimental durante a Segunda Guerra Mundial. Ele usa suas habilidades para combater os nazistas como o Capitão América enquanto lidera os Comandos Selvagens.',
        'Ao longo dos anos, o Capitão América enfrentou muitos vilões poderosos e participou de várias equipes de super-heróis, incluindo os Vingadores. Ele é conhecido por seu senso de justiça e lealdade aos seus amigos.'
      ]
    }              
  ];  
}
