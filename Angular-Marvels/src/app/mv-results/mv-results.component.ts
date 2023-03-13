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
      title: 'Homem-Aranha',
      content: [
        'Homem-Aranha é um super-herói dos quadrinhos da Marvel Comics. Ele foi criado por Stan Lee e Steve Ditko e sua primeira aparição foi em Amazing Fantasy #15 em agosto de 1962.',
        'O personagem é o alter ego de Peter Parker, um estudante do ensino médio que ganha poderes de aranha depois de ser picado por uma aranha radioativa. Ele usa seus poderes para combater o crime como o Homem-Aranha enquanto tenta equilibrar sua vida pessoal e suas responsabilidades como super-herói.',
        'Ao longo dos anos, o Homem-Aranha enfrentou muitos vilões poderosos e participou de várias equipes de super-heróis. Ele é um dos personagens mais populares da Marvel Comics e já apareceu em vários filmes, desenhos animados e jogos eletrônicos.'
      ]
    },
    {
      title: 'Capitão América',
      content: [
        'Capitão América é um super-herói dos quadrinhos da Marvel Comics. Ele foi criado por Joe Simon e Jack Kirby e sua primeira aparição foi em Captain America Comics #1 em março de 1941.',
        'O personagem é o alter ego de Steve Rogers, um jovem franzino que se torna um supersoldado depois de receber um soro experimental durante a Segunda Guerra Mundial. Ele usa suas habilidades para combater os nazistas como o Capitão América enquanto lidera os Comandos Selvagens.',
        'Ao longo dos anos, o Capitão América enfrentou muitos vilões poderosos e participou de várias equipes de super-heróis, incluindo os Vingadores. Ele é conhecido por seu senso de justiça e lealdade aos seus amigos.'
      ]
    },
    {
      title: 'Pantera Negra',
      content: [
        'Pantera Negra é um super-herói dos quadrinhos da Marvel Comics. Ele foi criado por Stan Lee e Jack Kirby e sua primeira aparição foi em Fantastic Four #52 em julho de 1966.',
        "O personagem é o alter ego de T'Challa, o rei de Wakanda, um país africano fictício rico em tecnologia avançada e recursos naturais. Ele usa suas habilidades como guerreiro e líder para proteger seu povo como o Pantera Negra.",
        'Ao longo dos anos, o Pantera Negra enfrentou muitos vilões poderosos e participou de várias equipes de super-heróis, incluindo os Vingadores. Em 2018, ele ganhou seu próprio filme solo no Universo Cinematográfico Marvel.'
      ]
    },
    {
      title: 'Deadpool',
      content: [
        'Deadpool é um anti-herói dos quadrinhos da Marvel Comics. Ele foi criado por Fabian Nicieza e Rob Liefeld e sua primeira aparição foi em New Mutants #98 em fevereiro de 1991.',
        'O personagem é o alter ego de Wade Wilson, um mercenário que se submete a um experimento para curar seu câncer terminal. O experimento lhe dá habilidades regenerativas incríveis mas também o desfigura permanentemente. Ele usa suas habilidades para combater vilões enquanto faz piadas sarcásticas.',
        'Ao longo dos anos, Deadpool enfrentou muitos vilões poderosos e participou de várias equipes de super-heróis. Ele é conhecido por sua personalidade irreverente e pelo fato de quebrar a quarta parede ao falar diretamente com os leitores.'
      ]
    },
    {
      title: 'Wolverine',
      content: [
        'Wolverine é um dos mais famosos super-heróis pertencentes ao X-Men. Ele foi criado por Len Wein, John Romita Sr. e Herb Trimpe e sua primeira aparição foi em The Incredible Hulk #180 em 1974.',
        'O personagem é a identidade secreta de James "Logan" Howlett, ele é resultado de uma experiência científica bem sucedida que lhe concedeu garras retráteis e habilidades regenerativas.',
        'Wolverine é conhecido por sua natureza selvagem e agressiva, mas também tem um forte senso de honra e justiça. Ele é um mestre em artes marciais e combate corpo a corpo.',
        'Ao longo dos anos, Wolverine enfrentou muitos vilões poderosos e participou de várias equipes de super-heróis, incluindo os X-Men e os Vingadores.'
      ]
    },
    {
      title: 'Doutor Estranho',
      content: [
        'Doutor Estranho é um super-herói dos quadrinhos da Marvel Comics. Ele foi criado por Steve Ditko e Stan Lee e sua primeira aparição foi em Strange Tales #110 em 1963.',
        'O personagem é a identidade secreta de Stephen Strange, um neurocirurgião brilhante que sofreu um acidente de carro que danificou suas mãos. Ele procurou cura em todo o mundo e acabou encontrando o Ancião, que lhe ensinou as artes místicas.',
        'Doutor Estranho é conhecido por seus poderes mágicos e habilidades como feiticeiro supremo. Ele protege a Terra de ameaças místicas e sobrenaturais.',
        'Ao longo dos anos, Doutor Estranho enfrentou muitos vilões poderosos e participou de várias equipes de super-heróis, incluindo os Vingadores e os Defensores.'
      ]
    }                
  ];  
}
