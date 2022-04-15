'use strict';
const log = console.log
log('----------')
log('SCRIPT: Examples of using our libraries')
log('In general, we should have the code that uses our libraries separate from the actual library code.')

const ahnentafel = [
    {
        id: 1,
        partner: 2,
        level: -2,
        name: "paternal grandfather",
        gender: "male",
        additional: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    },
    {
        id: 2,
        partner: 1,
        level: -2,
        name: "paternal grandmother",
        gender: "female",
        additional: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    },
    {
        id: 3,
        partner: 4,
        level: -2,
        name: "maternal grandfather",
        gender: "male",
        additional: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    },
    {
        id: 4,
        partner: 3,
        level: -2,
        name: "maternal grandmother",
        gender: "female",
        additional: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    },
    {
        id: 5,
        partner: 6,
        parent1: 1,
        parent2: 2,
        level: -1,
        name: "father",
        gender: "male",
        additional: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    },
    {
        id: 6,
        partner: 5,
        parent1: 3,
        parent2: 4,
        level: -1,
        name: "mother",
        gender: "female",
        additional: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    },
    {
        id: 7,
        parent1: 5,
        parent2: 6,
        level: 0,
        name: "subject",
        gender: "male",
        additional: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    }
]

const starwars = [
    {
        id: 1,
        parent1: null,
        parent2: null,
        partner: 2,
        level: 0,
        name: "Anakin Skywalker",
        gender: "male",
        image: "https://snippet.dhtmlx.com/codebase/data/diagram/14/img/03.jpg",
        dates: "41BBY - 5ABY",
        glance: "The prophesied Chosen One",
        link: "https://starwars.fandom.com/wiki/Anakin_Skywalker",
        additional: {
            description: "Anakin Skywalker was a legendary Force-sensitive human male who was a Jedi Knight of the Galactic Republic and the prophesied Chosen One of the Jedi Order, destined to bring balance to the Force.",
            species: "Human",
            height: "1.88 meters, later 2.03 meters in armor",
            mass: "120 kilograms in armor",
            hair_color: "blond, light and dark",
            eye_color: "blue, later yellow (dark side)",
            skin_color: "light, later pale",
            cybernetics: "cybernetic right arm; later prosthetic arms and legs, and a life-support system"
        }
    },
    {
        id: 2,
        parent1: 13,
        parent2: 14,
        partner: 1,
        level: 0,
        name: "Padme Amidala",
        gender: "female",
        image: "https://snippet.dhtmlx.com/codebase/data/diagram/14/img/15.jpg",
        dates: "46BBY - 19BBY",
        glance: "Senator of Naboo",
        link: "https://starwars.fandom.com/wiki/Padm%C3%A9_Amidala",
        additional: {
            description: "Padmé Amidala Naberrie was a human female senator who represented the people of Naboo during the final years of the Galactic Republic. Prior to her career in the Galactic Senate, Amidala was the elected ruler of the Royal House of Naboo. A political idealist, she advocated for the preservation of democracy as well as a peaceful resolution to the Clone Wars. However, her secret marriage to the Jedi Knight Anakin Skywalker would have a lasting effect on the future of the galaxy for decades to come.",
            Species: "Human (Naboo)",
            Gender: "Female",
            Height: "1.65 meters (5 ft, 5 in)",
            Hair_color: "Brown",
            Eye_color: "Brown",
            Skin_color: "Light"
        }
    },
    {
        id: 5,
        parent1: 1,
        parent2: 2,
        partner: 6,
        level: 1,
        name: "Luke Skywalker",
        gender: "male",
        image: "https://snippet.dhtmlx.com/codebase/data/diagram/14/img/12.jpg",
        dates: "19BBY",
        glance: "Human male Jedi Master",
        additional: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    },
    {
        id: 6,
        parent1: null,
        parent2: null,
        partner: 5,
        level: 1,
        name: "Mara Jade Skywalker",
        gender: "female",
        image: "https://snippet.dhtmlx.com/codebase/data/diagram/14/img/13.jpg",
        dates: "17BBY",
        glance: "Dark Hand",
        additional: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    },
    {
        id: 3,
        parent1: 1,
        parent2: 2,
        partner: 4,
        level: 1,
        name: "Leia Skywalker",
        gender: "female",
        image: "https://snippet.dhtmlx.com/codebase/data/diagram/14/img/11.jpg",
        dates: "19BBY",
        glance: "Leader of the Resistance",
        additional: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    },
    {
        id: 4,
        parent1: null,
        parent2: null,
        partner: 3,
        level: 1,
        name: "Han Solo",
        gender: "male",
        image: "https://snippet.dhtmlx.com/codebase/data/diagram/14/img/06.jpg",
        dates: "32BBY",
        glance: "Smuggler and Gunslinger",
        additional: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    },
    {
        id: 10,
        parent1: 5,
        parent2: 6,
        level: 2,
        name: "Ben Skywalker",
        gender: "female",
        image: "https://snippet.dhtmlx.com/codebase/data/diagram/14/img/05.jpg",
        dates: "9BBY",
        glance: "Human male Jedi Knight",
        additional: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    },
    {
        id: 7,
        parent1: 4,
        parent2: 3,
        partner: 11,
        level: 2,
        name: "Jacen Solo",
        gender: "male",
        image: "https://snippet.dhtmlx.com/codebase/data/diagram/14/img/07.jpg",
        dates: "9BBY",
        glance: "Also known as Darth Caedus",
        additional: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    },
    {
        id: 8,
        parent1: 4,
        parent2: 3,
        partner: 12,
        level: 2,
        name: "Jaina Solo",
        gender: "female",
        image: "https://snippet.dhtmlx.com/codebase/data/diagram/14/img/09.jpg",
        dates: "9BBY",
        glance: "Human female Jedi Master",
        additional: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    },
    {
        id: 9,
        parent1: 4,
        parent2: 3,
        level: 2,
        name: "Anakin Solo",
        gender: "male",
        image: "https://snippet.dhtmlx.com/codebase/data/diagram/14/img/04.jpg",
        dates: "9BBY",
        glance: "Human male Jedi Knight",
        additional: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    },
    {
        id: 11,
        parent1: null,
        parent2: null,
        partner: 7,
        level: 2,
        name: "Tenel Ka Djo",
        gender: "female",
        image: "https://snippet.dhtmlx.com/codebase/data/diagram/14/img/21.jpg",
        dates: "9ABY",
        glance: "Female Human-Yuuzhan'Vong",
        additional: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    },
    {
        id: 12,
        parent1: null,
        parent2: null,
        partner: 8,
        level: 2,
        name: "Jagged Fel",
        gender: "male",
        image: "https://snippet.dhtmlx.com/codebase/data/diagram/14/img/08.jpg",
        dates: "9ABY",
        glance: "Human ace pilot",
        additional: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    },
    {
        id: 13,
        parent1: null,
        parent2: null,
        partner: 14,
        level: -1,
        name: "Ruwee Naberrie",
        gender: "male",
        image: "https://snippet.dhtmlx.com/codebase/data/diagram/14/img/18.jpg",
        dates: "9BBY",
        glance: "Citizen of Naboo",
        additional: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    },
    {
        id: 14,
        parent1: null,
        parent2: null,
        partner: 13,
        level: -1,
        name: "Jobal Naberrie",
        gender: "female",
        image: "https://snippet.dhtmlx.com/codebase/data/diagram/14/img/10.jpg",
        dates: "9BBY",
        glance: "Citizen of Naboo",
        additional: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    },
    {
        id: 15,
        parent1: 13,
        parent2: 14,
        level: 0,
        name: "Sola Naberrie",
        gender: "female",
        image: "https://snippet.dhtmlx.com/codebase/data/diagram/14/img/20.jpg"
    },
    {
        id: 16,
        parent1: 15,
        level: 1,
        name: "Ryoo Naberrie",
        gender: "female",
        image: "https://snippet.dhtmlx.com/codebase/data/diagram/14/img/19.jpg"
    },
    {
        id: 17,
        parent1: 7,
        parent2: 11,
        level: 3,
        name: "Allana Solo",
        gender: "female",
        image: "https://snippet.dhtmlx.com/codebase/data/diagram/14/img/02.jpg"
    },
    {
        id: 18,
        parent1: 12,
        parent2: 8,
        level: 3,
        name: "Fell II",
        gender: "male",
        image: "https://static.wikia.nocookie.net/starwars/images/9/94/Blue-question-mark.png/revision/latest/scale-to-width-down/40?cb=20210119225517"
    },
]

const royal = [
    {
        id: 1,
        level: 0,
        partner: 2,
        name: "King George VI",
        gender: "male",
        image: "https://m.media-amazon.com/images/M/MV5BYWZiMjE3MGItOTIwMS00MmE4LWJiOTEtMzE4ZTQwNmE3ODE3XkEyXkFqcGdeQXVyMTk2MzI2Ng@@._V1_.jpg"
    },
    {
        id: 2,
        level: 0,
        partner: 1,
        name: "Queen Elizabeth",
        gender: "female",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Queen_Elizabeth_the_Queen_Mother_portrait.jpg/1200px-Queen_Elizabeth_the_Queen_Mother_portrait.jpg",
        glance: "The Queen Mother"
    },
    {
        id: 3,
        level: 1,
        parent1: 1,
        parent2: 2,
        partner: 4,
        name: "Queen Elizabeth II",
        gender: "female",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Queen_Elizabeth_II_in_March_2015.jpg/1200px-Queen_Elizabeth_II_in_March_2015.jpg"
    },
    {
        id: 4,
        level: 1,
        partner: 3,
        name: "Prince Phillip",
        gender: "male",
        glance: "Duke of Edinburgh",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Duke_of_Edinburgh_33_Allan_Warren.jpg"
    },
    {
        id: 5,
        level: 1,
        parent1: 1,
        parent2: 2,
        name: "Princess Margaret",
        gender: "female",
        glance: "Countess of Snowden",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Princess_Margaret_1965b_%28cropped%29.jpg"
    },
    {
        id: 6,
        level: 2,
        parent1: 3,
        parent2: 4,
        partner: 7,
        name: "Prince Charles",
        gender:"male",
        glance: "Prince of Wales",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Charles%2C_Prince_of_Wales_at_COP21.jpg"
    },
    {
        id: 7,
        level: 2,
        partner: 6,
        name: "Princess Diana",
        gender: "female",
        glance: "Princess of Wales",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Diana%2C_Princess_of_Wales_1997_%282%29.jpg"
    },
    {
        id: 8,
        level: 2,
        parent1: 3,
        parent2: 4,
        name: "Anne",
        gender:"female",
        glance: "Princess Royal",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/98/Someone_enjoying_a_trip_out_with_their_sister_in_law_%28WCAS21%29_%2851440646599%29_%28cropped%29.jpg"
    },
    {
        id: 9,
        level: 2,
        parent1: 3,
        parent2: 4,
        name: "Prince Andrew",
        gender:"male",
        glance: "Duke of York",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Pr%C3%ADncipe_Andr%C3%A9_do_Reino_Unido.jpg/260px-Pr%C3%ADncipe_Andr%C3%A9_do_Reino_Unido.jpg"
    },
    {
        id: 10,
        level: 2,
        parent1: 3,
        parent2: 4,
        name: "Prince Edward",
        gender:"male",
        glance: "Earl of Wessex",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Prince_Edward_February_2015.jpg"
    },
    {
        id: 11,
        level: 3,
        parent1: 6,
        parent2: 7,
        partner: 12,
        name: "Prince William",
        gender:"male",
        glance: "Duke of Cambridge",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/af/William_Sumbarines_Crop.png"
    },
    {
        id: 12,
        level: 3,
        partner: 11,
        name: "Catherine",
        gender:"female",
        glance: "Duchess of Cambridge",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/The_Duke_and_Duchess_Cambridge_at_Commonwealth_Big_Lunch_on_22_March_2018_-_120_%28cropped%29.jpg/800px-The_Duke_and_Duchess_Cambridge_at_Commonwealth_Big_Lunch_on_22_March_2018_-_120_%28cropped%29.jpg"
    },
    {
        id: 13,
        level: 3,
        parent1: 6,
        parent2: 7,
        partner: 14,
        name: "Prince Harry",
        gender:"male",
        glance: "Duke of Sussex",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/32/Lancering_Invictus_Games_2020-7_%28cropped%29.jpg"
    },
    {
        id: 14,
        level: 3,
        partner: 13,
        name: "Meghan",
        gender:"female",
        glance: "Duchess of Sussex",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Meghan_Markle_-_2018_%28cropped%29.jpg"
    },
    {
        id: 15,
        level: 4,
        parent1: 11,
        parent2: 12,
        name: "Prince George of Cambridge",
        gender:"male",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Prince_George_of_Cambridge_in_2019_%28cropped%29.jpg"
    },
    {
        id: 16,
        level: 4,
        parent1: 11,
        parent2: 12,
        name: "Princess Charlotte of Cambridge",
        gender:"female",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Princess_Charlotte_of_Cambridge_in_2019_%28cropped%29.jpg"
    },
    {
        id: 17,
        level: 4,
        parent1: 11,
        parent2: 12,
        name: "Prince Louis of Cambridge",
        gender:"male",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Cambridge_family_at_Trooping_the_Colour_2019_-_14.jpg"

    },
    {
        id: 18,
        level: 4,
        parent1: 13,
        parent2: 14,
        name: "Archie Harrison Mountbatten-Windsor",
        gender:"male",
        image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pa-43955509-1562426599.jpg?crop=0.752xw:1.00xh;0.162xw,0&resize=480:*"
    },
]

const greeAhnentafel1 = new PedigreeTree("ahnentafel1");
const demoAhnentafel1 = document.getElementById('demoAhnentafel1');
greeAhnentafel1.setGraph({height: "520px"});
greeAhnentafel1.generate(demoAhnentafel1, ahnentafel);

const greeAhnentafel2 = new PedigreeTree("ahnentafel2");
const demoAhnentafel2 = document.getElementById('demoAhnentafel2');
greeAhnentafel2.setGraph({height: "520px", width:"983px", scaling: false, clickdrag: true, multiOpen: true});
greeAhnentafel2.generate(demoAhnentafel2, ahnentafel);

const greeStarWars = new PedigreeTree("starwars");
greeStarWars.setCard({width:305, hover:true});
const demoStarWars = document.getElementById('demoStarWars');
greeStarWars.generate(demoStarWars, starwars);

const greeRoyal = new PedigreeTree("royal");
greeRoyal.setGraph({height: "520px", clickdrag:true, scalingType:"x"});
greeRoyal.setCard({cardcolor:"#E6E6FA", fontsize: 18});
const demoRoyal= document.getElementById('demoRoyal');
greeRoyal.generate(demoRoyal, royal);



