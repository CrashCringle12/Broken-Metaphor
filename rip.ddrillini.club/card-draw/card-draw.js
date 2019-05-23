// Originally written by Ian.
// Revamped by Tana.
// I have opted for very verbose comments with the intent
// that less-JS-experienced clubmembers may open this in the future.

const tournament = 'rip11';

const discordWebhookUrl = 'https://dis' + 'corda' + 'pp.com/api/webho' + 'oks/51087618717882' + '7786/zBNpG-Db' + 'lnHLqfaHt8' + 'mI1gPZfKr0wEZ5p6MIr' + 'Z1fZ' + 'RJRz8jFYv' + '1IwqNIfdH5xIY-w_Ud'; // so bots don't scrape it
const previousStateStack = [];
let cardObjects = [];
let songs = [];


// when the webpage is finished loading
$(document).ready(() => {
  const cards = $('#card-area');

  // load the song data
  // This may fail (eg when you're running a local copy of the site and
  // accessing via file:// urls).
  var jqXHR = $.getJSON(`res/${tournament}/data.json`, (data) => {
    songs = data;
  })

  // Register a failure handler.
  jqXHR.fail(function() {
    var str = "Fail to load JSON. Stopping the page from loading.";
    alert(str)
    throw new Error(str);
  });

  const statuses = ['card_regular', 'card_protected', 'card_vetoed'];

  let currentPosition = -1;

  // param: number of cards you want
  // return: array of random integers from set of all possible songs
  function randomize(numRequested) {
    const randomNumberArray = [];

    // for a total of numRequested times
    for (let i = 0; i < numRequested; i += 1) {
      // generate a random number
      let x;
      let condition = true;
      do {
        // generate a random number on the range 0, total # songs - 1
        x = Math.floor(Math.random() * songs.length);

        // spaghettic code i'm sorry -ian
        if (document.getElementById("thirteens").checked)
        {
          // exit once you find an int not in the list
          // AND an int that doesn't correspond to a 13
          let check_if_in_list = randomNumberArray.indexOf(x) >= 0;
          let check_if_thirteen = songs[x].difficulty == 13 ? true : false ;
          // if either condition is true, you want to keep looping
          // i.e. set cond to true
          condition = check_if_in_list || check_if_thirteen;
          console.log("yeeted 13 " + songs[x].title);
        } else {
          // exit once you find an int not in the list
          condition = randomNumberArray.indexOf(x) >= 0;
        }
      } while (condition);

      // and with a difficulty number that is not 13
      // songs[x].difficulty != 13

      randomNumberArray.push(x);
    }

    // now the array contains a lot of random numbers
    return randomNumberArray;
  }

  function render(cardArray) {
    if (cardArray === null) {
      return;
    }

    // remove the old ones
    cards.empty();
    cardObjects = [];

    for (let i = 0; i < cardArray.length; i += 1) {
      const songObject = songs[cardArray[i]];
      const img = $(`
            <div class="card_regular">
                <div class="banner_image"></div>
                <div class="info_bar">
                    <div class="info_name">
                        <div class="text_title_wrapper">
                            <div class="text_title">${songObject.title}</div>
                            <div class="text_subtitle">${songObject.subtitle}</div>
                        </div>
                    </div>
                    <div class="info_difficulty">
                        <div class="text_difficulty">${songObject.difficulty}</div>
                    </div>
                </div>
            </div>
      `);
      img.children('.banner_image').css('background-image', `url("res/${tournament}/banners/${songObject.banner_filename}")`);
      if (songObject.subtitle === '') {
        img.find('.text_subtitle').remove();
      }
      img.status = 0;
      img.addClass(statuses[0]);
      img.click(() => {
        img.removeClass(statuses[img.status]);
        img.status += 1;
        img.status %= statuses.length;
        img.addClass(statuses[img.status]);
      });
      cards.append(img);
      cardObjects.push(img);
    }
  }

  function draw(number) {
    if (currentPosition < previousStateStack.length) {
      previousStateStack.length = currentPosition + 1;
    }

    const randomNumberArray = randomize(number);
    previousStateStack.push(randomNumberArray);
    currentPosition += 1;
    render(randomNumberArray);
  }

  function fuckGoBack() {
    if (currentPosition > 0) {
      currentPosition -= 1;
    }
    render(previousStateStack[currentPosition]);
  }

  function fuckGoForward() {
    if (currentPosition < previousStateStack.length - 1) {
      currentPosition += 1;
    }
    render(previousStateStack[currentPosition]);
  }

  function webhook() {
    if (currentPosition < 0) {
      alert('fuck there\'s nothing here');
    }

    const thePicks = previousStateStack[currentPosition];
    const result = [];

    for (let i = 0; i < cardObjects.length; i += 1) {
      const curr = cardObjects[i];
      const active = curr.status !== 2;
      if (active) {
        result.push(songs[thePicks[i]].title);
      }
    }

    const resultString = result.join(', ');
    const theBody = `pool picks: ${resultString}\nAnnyeong!!!! owo wwwww~~~~~`;

    $.post(discordWebhookUrl, JSON.stringify({ content: theBody }), 'json');
  }

  $('#draw5').on ({
    click: function() {
        draw(5);
      },
    mouseenter: function() {
      document.getElementById('draw5').style.outline = '3px solid rgb(65,108,166)';
      },
    mouseout: function() {
      document.getElementById('draw5').style.outline = '';
      }
  });

  $('#draw7').on({
    click: function() {
        draw(7);
      },
    mouseenter: function() {
      document.getElementById('draw7').style.outline = '3px solid rgb(65,108,166)';
      },
    mouseout: function() {
      document.getElementById('draw7').style.outline = '';
      }
  });
  $('#undo').on({
    click: function() {
        fuckGoBack();
      },
    mouseenter: function() {
      document.getElementById('undo').style.outline = '3px solid rgb(65,108,166)';
      },
    mouseout: function() {
      document.getElementById('undo').style.outline = '';
      }
  });
  $('#redo').on({
    click: function() {
        fuckGoForward();
      },
    mouseenter: function() {
      document.getElementById('redo').style.outline = '3px solid rgb(65,108,166)';
      },
    mouseout: function() {
      document.getElementById('redo').style.outline = '';
      }
  });
  $('#submit').on({
    click: function() {
            webhook();
      },
    mouseenter: function() {
      document.getElementById('submit').style.outline = '3px solid rgb(65,108,166)';
      },
    mouseout: function() {
      document.getElementById('submit').style.outline = '';
      }
  });
});
