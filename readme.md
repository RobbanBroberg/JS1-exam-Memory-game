# Memory game

The examiniation for the course Javascript part 1 is to create a memory game in groups of 2-3 students.

## Specifikation

-   A memory game that follows the ground rules specified down below or in the pdf "[MemoryGameRulesAndDesign](instructions_and_designsketch/MemoryGameRulesAndDesign.pdf)" (Swedish)
-   The game shall handle two players
-   The game shall contain at least 12 memory card pairs

### Optional

-   Make the card-flip animated
-   Create a hiscore that is saved in the localStorage ([mdn localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage))

## Design

Design is secondary. Main part is that there chould be at least 12 visible memory card pairs that can turn when clicked and that points is registered for every player.

No demand for responsive design.

## Rules

1. Randomly placed cards, facing down
2. Each player takes turns, choosing two cards.
    - If the cards is a matching pair, current player gets a score and a new chance
    - If cards don't match, cards face down and next players turn
3. The one with most points when all cards are opend, wins.

## if(have time)

-   single player game, on time.
-   background sound.
