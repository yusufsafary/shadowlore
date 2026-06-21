'use strict';

/* =============================================
   SHADOWLORE — Text Adventure Engine & Story
   ============================================= */

const SCENES = {
  gate:     'The Iron Gate of Valdris',
  city:     'The Streets of Valdris',
  tavern:   'The Last Ember Tavern',
  market:   'The Abandoned Market',
  passage:  'The Hidden Passage',
  cellar:   'The Royal Cellar',
  castle:   'The Road to Valdris Keep',
  interior: 'The Servant Corridors',
  throne:   'The Throne Room',
  darkness: 'The Void Between Worlds',
  dawn:     'Valdris, Reawakened',
};

/* ---- STORY DATA ---- */
const STORY = {

  /* ========== CHAPTER 1: ARRIVAL ========== */
  start: {
    scene: 'gate',
    chapter: 'Chapter I — The Iron Gate',
    text: `The road to Valdris ends at a gate corroded the colour of old blood. You were not invited. No one is, anymore — the city has been sealed for seven years, ever since King Morvain accepted the Shadow Architect's bargain and received, in place of the immortality he sought, something far worse: an endless, hollowed existence that has been slowly devouring his kingdom from the inside out.

But you have your reasons for being here. The gate stands ajar. Someone left it open. The wind through the gap smells of ash and something older — the particular silence of a place that has forgotten what life sounds like.`,
    choices: [
      { text: 'Push the gate open and enter', next: 'city_gate' },
      { text: 'Examine the gate carefully before entering', next: 'gate_clues' }
    ]
  },

  gate_clues: {
    scene: 'gate',
    chapter: 'Chapter I — The Iron Gate',
    flag: 'saw_warning',
    stat: { knowledge: 1 },
    text: `The gate bears a carved frieze — not decoration, but testimony. Each panel depicts a different fate. A nobleman who spoke truth to the king and was found the next morning without his tongue. A healer who offered comfort and returned from the castle with her hands reversed. A child who asked why the birds no longer sang and simply ceased to exist.

Beneath the final panel, scratched into the iron by something desperate and sharp, are nine words: <em>HE CANNOT SLEEP. HE HAS FORGOTTEN HE WAS HUMAN.</em>

The scratch is recent. The metal around it is still bright.`,
    choices: [
      { text: 'File this information carefully and enter the city', next: 'city_gate' }
    ]
  },

  city_gate: {
    scene: 'city',
    chapter: 'Chapter I — The City of Ash',
    text: `Inside, Valdris is a city mid-exhale — as if it drew one great breath seven years ago and never let it out. The streets are empty but not abandoned. Doors hang open. Meals sit half-eaten on tables visible through windows, petrified now to stone. A cart of vegetables has become a cart of grey dust. Everything paused. Everything waiting.

The only light comes from the castle at the hill's peak, where one window glows with an amber that does not flicker — not firelight, but something older and colder pretending to be warmth.`,
    choices: [
      { text: 'Follow the smell of smoke to the tavern district', next: 'tavern' },
      { text: 'Explore the abandoned market', next: 'market' },
      { text: 'Go directly to the castle — there is no time to waste', next: 'castle_road' }
    ]
  },

  /* ========== TAVERN BRANCH ========== */
  tavern: {
    scene: 'tavern',
    chapter: 'Chapter I — The Last Ember',
    text: `The tavern sign reads <em>The Last Ember</em>, which feels both accurate and cruel. Inside, three patrons sit at separate tables, not speaking, not looking at each other. They have the hollow-eyed stillness of people who have survived something they cannot explain and are still deciding what to do with that survival.

The barkeep — a woman with grey in her hair and something careful in her eyes — sets a cup on the bar without being asked. In the far corner, a woman sits alone with a rolled map and a glass she hasn't touched.`,
    choices: [
      { text: 'Order a drink and listen to the room', next: 'drink_alone' },
      { text: 'Approach the woman with the map', next: 'meet_mira' }
    ]
  },

  drink_alone: {
    scene: 'tavern',
    chapter: 'Chapter I — Overheard',
    flag: 'knows_plot',
    stat: { knowledge: 1 },
    text: `The drink tastes of woodsmoke and something medicinal. You listen. Two of the patrons — men with the look of people who have made a decision they are trying not to think too hard about — are speaking quietly. Not quietly enough.

<em>"Tonight. When the third bell rings. Maret has a key to the east postern."</em>
<em>"And you think a blade will work on something that doesn't have a heart left?"</em>
<em>"We have to try. The city will never—"</em>

They notice you listening. They leave. But you have heard enough: someone plans to kill the king tonight, with a key to the east postern gate.`,
    choices: [
      { text: 'Head to the castle — you need to get there before the third bell', next: 'castle_road' }
    ]
  },

  meet_mira: {
    scene: 'tavern',
    chapter: 'Chapter I — The Cartographer',
    text: `She looks up before you reach her table, as though she heard you thinking about her. Up close, you can see the map is of the castle — detailed, annotated in a small precise hand, and clearly drawn from memory. From recent memory.

<em>"You are not from Valdris,"</em> she says. <em>"Which means you came here on purpose. Which means you are either here to help or here to make things worse."</em> She gestures at the other chair. <em>"Sit down and I will decide which."</em>`,
    choices: [
      { text: 'Sit and tell her why you came', next: 'mira_story' },
      { text: 'Decline and head to the castle alone', next: 'castle_road' }
    ]
  },

  mira_story: {
    scene: 'tavern',
    chapter: 'Chapter I — Mira\'s Map',
    flag: 'mira_ally',
    stat: { knowledge: 1 },
    text: `Her name is Mira. She was the royal cartographer for twelve years — <em>"I made the maps that told Morvain what his kingdom looked like from above. He always said maps were the only honest things in a court full of liars."</em>

When the king made his bargain, she was the last to leave. She has been waiting in this tavern for three years, trying to find someone capable of reaching him. She knows a way into the castle — a service entrance to the cellar that the guards have forgotten about. <em>"He is not gone,"</em> she says quietly. <em>"Not entirely. I have heard him. Late at night. He still says my name."</em>`,
    choices: [
      { text: 'Accept her help and go to the castle together', next: 'castle_road' },
      { text: 'Thank her but go alone — this is something you need to do yourself', next: 'castle_road' }
    ]
  },

  /* ========== MARKET BRANCH ========== */
  market: {
    scene: 'market',
    chapter: 'Chapter I — The Abandoned Market',
    text: `The market district has become a kind of museum of interrupted commerce. Stalls still display goods — cloth bleached grey by years, produce returned to its component elements, ironwork rusted into abstract forms. One stall is different: a lamp burns inside it, and the goods are recent. Fresh bread. Candles. A person is here.

The merchant is old, deliberate in movement, and does not seem surprised to see you. Behind a bolt of cloth, barely visible, a child watches with enormous eyes.`,
    choices: [
      { text: 'Speak to the child hiding behind the cloth', next: 'find_child' },
      { text: 'Buy supplies from the merchant and ask about the castle', next: 'buy_supplies' }
    ]
  },

  find_child: {
    scene: 'market',
    chapter: 'Chapter I — What the Child Knows',
    flag: 'knows_passage',
    stat: { knowledge: 1 },
    text: `The child — a girl of perhaps nine, with the old eyes of someone who has seen too many seasons of this — does not run when you approach. <em>"You are going to the castle,"</em> she says. Not a question. <em>"Everyone who comes here eventually goes to the castle."</em>

She tells you about a passage. Beneath the Chapel of the Architects, there is a door that leads under the castle walls. The king's builders put it in three centuries ago — an escape route, forgotten in the official plans. <em>"I found it when I was looking for my mother,"</em> she says. Then: <em>"I didn't find my mother."</em>

She tells you where the chapel is without being asked.`,
    choices: [
      { text: 'Thank her and head to the castle', next: 'castle_road' }
    ]
  },

  buy_supplies: {
    scene: 'market',
    chapter: 'Chapter I — The Merchant\'s Warning',
    flag: 'has_supplies',
    stat: { courage: 1 },
    text: `The merchant takes your coin without comment and gives you provisions — dried meat, a good candle, a coil of rope. As he wraps them, he speaks without looking up: <em>"The guards at the main gate are bribeable. They've been here seven years without pay. What they want more than money is proof that the world outside still exists."</em>

He hands you the package. <em>"Tell them what the sky looks like somewhere else. They'll let you through."</em>

You ask how he knows this. He smiles, not warmly. <em>"I was one of them. Before I decided I'd rather sell bread to ghosts than guard a king who doesn't know he's one."</em>`,
    choices: [
      { text: 'Head to the castle', next: 'castle_road' }
    ]
  },

  /* ========== CHAPTER 2: THE CASTLE ========== */
  castle_road: {
    scene: 'castle',
    chapter: 'Chapter II — Valdris Keep',
    text: `The castle sits at Valdris's high point the way a stone sits at the centre of a still pond — everything arranged around it, everything pointing toward it. Up close, it is larger than it appeared from the gate, and older. The stones are not quite the right shape for the architecture around them. Someone built this place from materials they found rather than made.

Two guards stand at the main gate. A chapel sits to the left, its doors ajar, a dark slot of an opening visible at its base. To the right, an overgrown service path leads around the castle's flank.`,
    choices: [
      { text: 'Approach the main gate and speak to the guards', next: 'front_gate' },
      { text: 'Take the passage beneath the chapel', next: 'side_passage', requires: 'knows_passage', label: '🔓 [Known route]' },
      { text: 'Follow Mira\'s directions to the service entrance', next: 'cellar_entrance', requires: 'mira_ally', label: '🔓 [Mira\'s route]' }
    ]
  },

  front_gate: {
    scene: 'castle',
    chapter: 'Chapter II — The Gate Guards',
    text: `The guards are not what you expected. They are tired — not the tiredness of a long shift but the tiredness of people who have been tired for seven years and can no longer remember what rest felt like. Their armour fits them the way memories fit people who have grown past them.

They see you. They do not draw weapons. One of them says, with something like hope in his voice: <em>"You came from outside."</em>

It is not a question. It is something closer to a prayer.`,
    choices: [
      { text: 'Tell them what the world outside looks like — in detail', next: 'guards_convinced', requires: 'has_supplies', label: '🔓 [Merchant\'s advice]' },
      { text: 'Tell them what the world outside looks like — in detail', next: 'guards_convinced' },
      { text: 'Claim to be a physician summoned by the king', next: 'guards_lie' }
    ]
  },

  guards_convinced: {
    scene: 'castle',
    chapter: 'Chapter II — Through the Gate',
    stat: { reputation: 1 },
    text: `You tell them. The colour of the sky two days' ride east of here — a particular shade of blue that exists in open country with no stone to interrupt it. The way markets smell in morning. The sound of a river running over rock. The guards listen with their eyes closed.

When you finish, one of them steps aside without a word. The other catches your arm. <em>"If you see him,"</em> he says. <em>"Tell him that Garrett and Peyne waited. He'll know who we are. Or he used to."</em>`,
    choices: [
      { text: 'Enter the castle', next: 'throne_approach' }
    ]
  },

  guards_lie: {
    scene: 'castle',
    chapter: 'Chapter II — The Lie',
    stat: { reputation: -1 },
    text: `The guards exchange a look. <em>"The king doesn't summon physicians anymore,"</em> one of them says carefully. <em>"The king doesn't summon anyone. He hasn't spoken an order in four years."</em>

But they let you through anyway. Perhaps because they no longer care. Perhaps because they're curious what happens next. The gate grinds open.`,
    choices: [
      { text: 'Enter the castle quickly before they change their minds', next: 'throne_approach' }
    ]
  },

  side_passage: {
    scene: 'passage',
    chapter: 'Chapter II — Beneath the Chapel',
    flag: 'knows_layout',
    text: `The passage is low and old — older than the castle, older than Valdris, perhaps. The walls are not stone but something that was stone once and has become something else over centuries of pressure and silence. You move by touch and the faint grey light that seems to come from the walls themselves.

At the far end, stone steps lead up into a room that smells of candle wax and old fabric. The servant quarters. You emerge behind a wardrobe and stand very still, listening.

Nothing moves. The castle is as empty as the city below it. Almost.`,
    choices: [
      { text: 'Follow the sound of silence toward the throne room', next: 'throne_approach' }
    ]
  },

  cellar_entrance: {
    scene: 'cellar',
    chapter: 'Chapter II — The Royal Cellar',
    flag: 'knows_secret',
    stat: { knowledge: 2 },
    text: `Mira leads you through the service entrance without hesitation — she has memorised every step, every turn. The cellar is enormous, its vaulted ceilings lost in shadow, its racks still holding bottles from seven years ago and earlier. She moves directly to a corner where a leather satchel sits, placed deliberately.

<em>"I hid this here last year,"</em> she says, opening it. Inside: three journals in the king's own hand, the last one written recently. You read the relevant passages quickly. The bargain had a flaw — a condition the Shadow Architect never disclosed. If someone speaks the king's <strong>true name</strong> — the name given before his coronation, which no one alive knows — the Architect is bound to release him.

The name is on the last page: <em>Edran. His name, before they made him a king, was Edran.</em>`,
    choices: [
      { text: 'Take the journals and proceed to the throne room', next: 'throne_approach' }
    ]
  },

  /* ========== CHAPTER 3: THE KING ========== */
  throne_approach: {
    scene: 'interior',
    chapter: 'Chapter III — The Throne Room',
    text: `The corridor to the throne room is lined with portraits. Kings and queens of Valdris, going back six centuries — all painted in the same pose, the same slight angle of the head, as if they were all the same person wearing different faces. The last portrait is Morvain. In it, he looks like a man who is trying to smile and has forgotten how.

The throne room doors are open. There is no sound from within. There is no sound anywhere in this castle — only the particular loudness of complete silence, which is never as empty as it sounds.`,
    choices: [
      { text: 'Enter the throne room', next: 'throne_room' }
    ]
  },

  throne_room: {
    scene: 'throne',
    chapter: 'Chapter III — The Hollow King',
    text: `He is on the throne. He has always been on the throne, you suspect — the way mountains are always in the same place regardless of whether you are looking at them. King Morvain is not old and not young and not quite alive in the way living things usually are. He is present in the way that an echo is present: a record of something that once made noise.

He turns his head when you enter. His eyes find you slowly, as if they have to remember how to focus. And then, quietly, with something that might have been relief seven years ago: <em>"Someone came."</em>`,
    choices: [
      { text: 'Demand he tell you what happened to this city', next: 'demand_truth' },
      { text: 'Tell him you came to help — if that is still possible', next: 'offer_help' },
      { text: 'Speak the name Edran — his name before the crown', next: 'use_secret', requires: 'knows_secret', label: '🔓 [The true name]' },
      { text: 'Draw your blade — some things are beyond saving', next: 'attack_king' }
    ]
  },

  demand_truth: {
    scene: 'throne',
    chapter: 'Chapter III — The King\'s Account',
    stat: { knowledge: 1 },
    text: `He does not flinch from the demand. Perhaps he expected it. Perhaps he has rehearsed this in the dark for seven years.

<em>"I was afraid of death,"</em> he says. <em>"Not bravely afraid, where fear makes you wise. Foolishly afraid — the kind that makes you bargain. The Architect offered me eternity. I didn't ask what kind."</em>

He looks at his hands as if they belong to someone else. <em>"What I received was continuation without participation. I watch Valdris. I cannot reach it. I remember being a king, a person, a — I remember having a name that wasn't a title. But the longer I sit here, the further away that memory gets."</em>

He meets your eyes. <em>"I would like to stop. I don't know how."</em>`,
    choices: [
      { text: 'Ask if there is a way to end the bargain', next: 'final_choice' }
    ]
  },

  offer_help: {
    scene: 'throne',
    chapter: 'Chapter III — The Opening',
    stat: { reputation: 1 },
    text: `Something shifts in him at the word <em>help</em>. Not dramatically — no tears, no speeches. Just a small, careful release, the way a fist slowly opens when it has been clenched so long it has forgotten there is another option.

<em>"You shouldn't have come,"</em> he says. But he says it like a person who is grateful you did. <em>"This place is not— I am not safe. I am not entirely here. The parts of me that are still present are shrinking."</em>

He pauses. <em>"But. If someone were to help me remember what I was before all this — not the king. The person. I think that might matter. I think the bargain has a weakness I have been too alone to find."</em>`,
    choices: [
      { text: 'Tell him everything you have learned about the bargain', next: 'final_choice' }
    ]
  },

  use_secret: {
    scene: 'throne',
    chapter: 'Chapter III — The True Name',
    flag: 'used_secret',
    stat: { knowledge: 1 },
    text: `When you speak it — <em>Edran</em> — the sound does something to the air in the throne room. Not magic, exactly. Something older than magic: recognition. The weight of a person being seen as themselves rather than as the thing they became.

The king's eyes focus in a way they haven't, you suspect, in years. He stares at you. His mouth opens. Closes. Opens again.

<em>"Where did you—"</em> He stops. Something cracks in his expression — not breaks, but shifts, the way ice shifts over deep water in early spring. <em>"No one has called me that since my mother. Since before the crown."</em>

He is trembling. <em>"I remember. I remember that I had a name."</em>`,
    choices: [
      { text: 'Tell him what this means — and what must be done', next: 'final_choice' }
    ]
  },

  attack_king: {
    scene: 'throne',
    chapter: 'Chapter III — The Futile Blade',
    text: `Your blade connects. The king does not dodge, does not raise a hand. He simply receives the blow with the patience of something that has long since made peace with the possibility of violence.

The blade passes through him. Not as through a ghost — he is solid, physical, present. But the wound seals before it can deepen, drawn shut by whatever the Shadow Architect wove into him. He watches you with an expression that is not unkindness.

<em>"I have tried that too,"</em> he says quietly. <em>"Every night for two years, I attempted to end myself. The bargain does not allow it. If you are going to help me, it will have to be another way."</em>`,
    choices: [
      { text: 'Lower the blade. There must be another way.', next: 'final_choice' },
      { text: 'Attack with everything — force the bargain to break', next: 'ending_shadow' }
    ]
  },

  /* ========== THE FINAL CHOICE ========== */
  final_choice: {
    scene: 'throne',
    chapter: 'Chapter III — The Last Door',
    text: `The king waits. He has been waiting for seven years; a few more moments cost him nothing. Outside, distantly, a bell begins to toll. Third bell. The conspirators with their key to the east postern are moving.

You have the king's attention. You have, perhaps, a moment before whatever happens next happens without you. The choices in front of you are not good choices and bad choices — they are different kinds of cost, different shapes of consequence.

The king says nothing. He is watching you with something that might be trust, which is more than you have earned and exactly what you need.`,
    choices: [
      { text: 'Document the king\'s full story aloud — every truth, spoken into the record', next: 'ending_archivist' },
      { text: 'Accept the Shadow Architect\'s bargain in the king\'s place', next: 'ending_bargain' },
      { text: 'Speak his true name again, this time as a command to the Architect', next: 'ending_truth', requires: 'used_secret', label: '🔓 [True Name]' },
      { text: 'Ask Mira — she has been waiting seven years for this moment', next: 'ending_companion', requires: 'mira_ally', label: '🔓 [Mira\'s choice]' }
    ]
  },

  /* ========== ENDINGS ========== */
  ending_archivist: {
    scene: 'dawn',
    ending: true,
    ending_type: 'bittersweet',
    ending_title: 'The Last Record',
    text: `You speak. Not commands, not bargains — <em>truth</em>. You tell the king's story from the beginning: the boy before the crown, the fear, the bargain, the seven years of watching his city petrify around him. You name every detail you have collected — from the gate's carvings, from the tavern, from the cellar journals. You name the guards who waited. You name Mira.

The Archivist's tradition: a story fully told is a story fully released.

As you finish, the amber light in the throne room dims to nothing. The king — Edran — closes his eyes. He does not collapse or dissolve. He simply <em>exhales</em>, one long breath, seven years in the holding. When his eyes open again, they are clear.

<em>"Thank you,"</em> he says. And then he is gone — not destroyed, not trapped. <em>Released.</em>

Outside, the city of Valdris begins, slowly, to remember how to be alive. You walk back down through streets where doors are closing, where windows are lighting, where the ash is lifting. You did not save Valdris. You told its story. Sometimes that is the same thing.`,
    choices: []
  },

  ending_truth: {
    scene: 'dawn',
    ending: true,
    ending_type: 'good',
    ending_title: 'The True Name',
    text: `<em>"Edran."</em>

You speak it not as a word but as a demand — addressed not to the king, but through him, to the Architect whose bargain holds him. You have read enough of the journals to understand the contract's flaw: the Architect never anticipated someone knowing the name before the crown, the name beneath the title, the person beneath the king.

The air in the throne room changes. Not temperature — something subtler, like the pressure before a storm finding its release.

A voice — not heard but understood — says: <em>The condition was not disclosed. The bargain is void.</em>

Morvain — Edran — straightens on his throne as something lifts from him. Colour returns to his face incrementally, the way dawn returns to the sky. He stands. He is unsteady. He looks at his hands as if rediscovering them.

<em>"It worked,"</em> he says, sounding genuinely surprised. <em>"You found the flaw."</em>

<em>"The cartographer hid the journals,"</em> you say. <em>"She waited three years for someone to find them."</em>

He closes his eyes. When he opens them: <em>"I need to go and thank her."</em>

Valdris is already waking. The best endings, you reflect, are the ones that keep going after you stop watching.`,
    choices: []
  },

  ending_companion: {
    scene: 'dawn',
    ending: true,
    ending_type: 'bittersweet',
    ending_title: 'Mira\'s Choice',
    text: `You call her name. She appears from the corridor — she has been here, waiting, as she always waits. She looks at the king for a long moment. He looks at her.

<em>"Mira,"</em> he says. Seven years of weight in the two syllables.

<em>"Edran,"</em> she says. And then, to you: <em>"Leave us. I know what to do."</em>

You learn what she did afterward, from the guards. She spoke for three hours — the king's full history, his name, his humanity, in greater detail than anyone alive could have managed, because she had spent twelve years making maps of his kingdom and knew its every contour by heart. When she finished, both of them were gone.

The city of Valdris woke the next morning. No one could explain it. The guards — Garrett and Peyne — tell the story of the cartographer who waited, who came back, who remembered the king better than he could remember himself. It is, eventually, the founding myth of a rebuilt Valdris. Mira would have said that maps were the only honest things in a court full of liars. She made the most honest map of all: a map of one person's lost humanity, accurate to the end.`,
    choices: []
  },

  ending_bargain: {
    scene: 'darkness',
    ending: true,
    ending_type: 'dark',
    ending_title: 'The New Hollow',
    text: `<em>"I'll take his place,"</em> you say.

The Shadow Architect does not announce itself. The bargain simply shifts — you feel it the way you feel a change in weather: in your chest, in the quality of the air, in the sudden absence of whatever it was that made you <em>you</em> rather than simply a body occupying a throne.

Morvain — Edran — stands slowly. He looks at you with something like grief. <em>"You shouldn't have done that."</em>

<em>"Someone had to."</em>

He leaves. The city will wake. You will watch it from the throne window, unable to reach it. The amber light that does not flicker will resume its place in the window at the hill's peak, visible to travellers on the road, who will wonder about it and, eventually, stop wondering. Things that have always been there stop being questions.

You will learn, over the years, that the hardest part is not the loneliness. It is remembering that you chose this, and being unable to decide if it was wisdom or an error, and eventually losing the ability to tell the difference.`,
    choices: []
  },

  ending_shadow: {
    scene: 'darkness',
    ending: true,
    ending_type: 'dark',
    ending_title: 'The Shadow\'s Price',
    text: `You put everything into it — not anger, but intention. The blade, the force, the refusal to accept that some things cannot be ended. The king receives each blow with the same patience until, finally, something gives.

Not his body. His shadow.

The shadow detaches from him and moves — not toward you, but through you. You feel it pass like cold water through cloth. Morvain collapses forward, finally, <em>genuinely</em> unconscious — not hollow, not continuing. Asleep.

The shadow finds somewhere to be. You discover where when you look at your hands in the courtyard later and find they do not cast shadows of their own. You feel the bargain settling into you the way a stone settles into mud — slowly, thoroughly, without drama.

Morvain will wake. He will not remember the bargain, only his city, his people, his name. He will be king again, a real one, a human one. You will be something else — something that watches from the margins of things and cannot quite reach them.

The cost was real. The outcome was real. Whether it was worth it is a question you will have a very long time to consider.`,
    choices: []
  }

};

/* =============================================
   GAME ENGINE
   ============================================= */
class GameEngine {
  constructor() {
    this.state = this.defaultState();
    this.rendering = false;
    this.typewriterTimeout = null;
  }

  defaultState() {
    return {
      currentNode: 'start',
      visitedNodes: [],
      flags: {},
      stats: { knowledge: 0, reputation: 0, courage: 0 },
      history: []
    };
  }

  save() {
    try {
      localStorage.setItem('sl_game_save', JSON.stringify(this.state));
    } catch(e) {}
  }

  load() {
    try {
      const raw = localStorage.getItem('sl_game_save');
      if (!raw) return false;
      this.state = JSON.parse(raw);
      return true;
    } catch(e) { return false; }
  }

  reset() {
    try { localStorage.removeItem('sl_game_save'); } catch(e) {}
    this.state = this.defaultState();
    this.render();
  }

  hasSave() {
    try { return !!localStorage.getItem('sl_game_save'); } catch(e) { return false; }
  }

  hasFlag(flag) {
    return !!this.state.flags[flag];
  }

  goto(nodeId) {
    const node = STORY[nodeId];
    if (!node) return;

    // Record history
    const prev = STORY[this.state.currentNode];
    if (prev && this.state.history.length === 0 || this.state.currentNode !== nodeId) {
      this.state.history.push({
        node: this.state.currentNode,
        chapter: prev?.chapter || '',
        scene: prev?.scene || '',
      });
    }

    // Apply node effects
    if (node.flag) this.state.flags[node.flag] = true;
    if (node.stat) {
      Object.entries(node.stat).forEach(([k, v]) => {
        this.state.stats[k] = (this.state.stats[k] || 0) + v;
      });
    }

    if (!this.state.visitedNodes.includes(nodeId)) {
      this.state.visitedNodes.push(nodeId);
    }

    this.state.currentNode = nodeId;
    this.save();
    this.render();
  }

  choose(choiceIndex) {
    const node = STORY[this.state.currentNode];
    if (!node) return;
    const available = this.getAvailableChoices(node);
    const choice = available[choiceIndex];
    if (!choice) return;
    this.goto(choice.next);
  }

  getAvailableChoices(node) {
    return (node.choices || []).filter(c => {
      if (!c.requires) return true;
      return this.hasFlag(c.requires);
    });
  }

  render() {
    const node = STORY[this.state.currentNode];
    if (!node) return;

    // Clear any ongoing typewriter
    if (this.typewriterTimeout) {
      clearTimeout(this.typewriterTimeout);
      this.typewriterTimeout = null;
    }

    // Update scene label
    const sceneEl = document.getElementById('scene-label');
    if (sceneEl) sceneEl.textContent = SCENES[node.scene] || '';

    // Update chapter
    const chapterEl = document.getElementById('chapter-label');
    if (chapterEl) chapterEl.textContent = node.chapter || '';

    // Update background scene class
    document.getElementById('game-bg')?.setAttribute('data-scene', node.scene || 'gate');

    // Update stats
    this.renderStats();

    // Update text
    const textEl = document.getElementById('story-text');
    if (textEl) {
      textEl.style.opacity = '0';
      textEl.innerHTML = '';
      setTimeout(() => {
        textEl.innerHTML = node.text || '';
        textEl.style.opacity = '1';
      }, 200);
    }

    // Update choices or ending
    const choicesEl = document.getElementById('choices');
    if (!choicesEl) return;
    choicesEl.innerHTML = '';

    if (node.ending) {
      this.renderEnding(node, choicesEl);
    } else {
      const available = this.getAvailableChoices(node);
      available.forEach((choice, i) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerHTML = `<span class="choice-num">${i + 1}</span><span class="choice-text">${choice.label || choice.text}</span>`;
        btn.addEventListener('click', () => this.choose(i));
        choicesEl.appendChild(btn);
      });
    }

    // Scroll to top of story
    document.getElementById('story-panel')?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderStats() {
    const s = this.state.stats;
    const total = Math.max(1, s.knowledge + s.reputation + s.courage);
    document.getElementById('stat-knowledge')?.style.setProperty('--val', Math.min(s.knowledge, 6));
    document.getElementById('stat-reputation')?.style.setProperty('--val', Math.min(Math.max(s.reputation + 3, 0), 6));
    document.getElementById('stat-courage')?.style.setProperty('--val', Math.min(s.courage, 6));

    const labels = ['💡', '🗡️', '⚖️'];
    ['knowledge', 'courage', 'reputation'].forEach((k, i) => {
      const el = document.getElementById(`stat-${k}-val`);
      if (el) el.textContent = this.state.stats[k] >= 0 ? `+${this.state.stats[k]}` : this.state.stats[k];
    });
  }

  renderEnding(node, container) {
    const wrap = document.createElement('div');
    wrap.className = `ending ending--${node.ending_type || 'neutral'}`;
    wrap.innerHTML = `
      <div class="ending-badge">${
        node.ending_type === 'good' ? '★ True Ending' :
        node.ending_type === 'bittersweet' ? '◆ Bittersweet Ending' :
        '✦ Dark Ending'
      }</div>
      <h3 class="ending-title">${node.ending_title}</h3>
      <div class="ending-actions">
        <button class="choice-btn choice-btn--restart" id="btn-restart-end">
          <span class="choice-num">↩</span>
          <span class="choice-text">Begin Again — A Different Path</span>
        </button>
      </div>
    `;
    container.appendChild(wrap);
    document.getElementById('btn-restart-end')?.addEventListener('click', () => {
      if (confirm('Start a new game? Your current progress will be lost.')) {
        this.reset();
      }
    });
  }

  toggleHistory() {
    const panel = document.getElementById('history-panel');
    if (!panel) return;
    const open = panel.classList.toggle('open');
    if (open) this.renderHistory();
  }

  renderHistory() {
    const list = document.getElementById('history-list');
    if (!list) return;
    if (this.state.history.length === 0) {
      list.innerHTML = '<li class="history-empty">Your journey begins here.</li>';
      return;
    }
    list.innerHTML = this.state.history.map(h =>
      `<li><span class="history-chapter">${h.chapter || SCENES[h.scene] || h.node}</span></li>`
    ).join('');
  }
}

/* ---- Boot ---- */
document.addEventListener('DOMContentLoaded', () => {
  window.game = new GameEngine();

  // Check for save
  const hasSave = game.hasSave();
  const startScreen = document.getElementById('start-screen');
  const gameScreen  = document.getElementById('game-screen');

  document.getElementById('btn-new-game')?.addEventListener('click', () => {
    game.reset();
    startScreen?.classList.add('hidden');
    gameScreen?.classList.remove('hidden');
    game.goto('start');
  });

  document.getElementById('btn-continue')?.addEventListener('click', () => {
    if (game.load()) {
      startScreen?.classList.add('hidden');
      gameScreen?.classList.remove('hidden');
      game.render();
    }
  });

  document.getElementById('btn-restart')?.addEventListener('click', () => {
    if (confirm('Start a new game? Your current progress will be lost.')) {
      game.reset();
    }
  });

  document.getElementById('btn-history')?.addEventListener('click', () => {
    game.toggleHistory();
  });

  document.getElementById('btn-close-history')?.addEventListener('click', () => {
    document.getElementById('history-panel')?.classList.remove('open');
  });

  // Continue button visibility
  if (hasSave) {
    document.getElementById('btn-continue')?.classList.remove('hidden');
  }
});
