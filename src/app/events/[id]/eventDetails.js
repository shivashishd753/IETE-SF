// Extra content for each event's detail page.
//
// HOW MATCHING WORKS
//   The page matches an event by its TITLE (capitals, spaces, dashes and
//   dots are ignored), e.g. "Robo Soccer", "robo-soccer" and "ROBOSOCCER"
//   all match the same entry. A database id as a string (e.g. "5") also works.
//   If the title in your admin panel is spelled differently from the keys
//   below, just copy the title exactly as the card shows it into a new key.
//
// Any field you leave out is simply not shown.
// Winners: { position, name, members: [..] }  (members is optional)

const nexus = {
  tagline: "The only way to do great work is to love what you do. — Steve Jobs",
  about: [
    "NEXUS 3.0 is the ultimate web development contest of the year, hosted by the IETE Students' Forum, BIT Sindri. It was designed to fuel passion for technology, sharpen coding skills and let creativity run free.",
    "Participants solved real-world challenges through innovative web solutions and showcased their skills in front of a panel of industry experts.",
    "An immersive experience where imagination meets development.",
  ],
  highlights: [
    "Solve real-world challenges through innovative web solutions",
    "Compete for exciting prizes and national recognition",
    "Showcase your skills to a panel of industry experts",
    "Hosted by the IETE Students' Forum, BIT Sindri",
  ],
};

const clueeminati = {
  tagline: "A 7-day challenge to test your intelligence, speed and strategy.",
  about: [
    "Clue-e-minati Adventure was a 7-day online puzzle challenge run on IETE's Instagram. A new clue was posted every day at 9 AM sharp, and participants had to crack it as quickly and accurately as possible.",
    "Answers were sent through direct message to IETE's Instagram account (comments were disabled, so only DMs counted), in the format: name, roll number and answer.",
    "Starting 27th September, each day brought a new puzzle to ignite curiosity. The quicker and more accurate the answers, the higher the chances of being the winner.",
  ],
  highlights: [
    "A new clue every day at 9 AM for 7 days",
    "Answers submitted through Instagram direct messages",
    "Speed and accuracy decided the winner",
    "Started on 27th September",
  ],
};

const eventDetails = {
  "Minefield Rescue": {
    tagline:
      "In the shadows of chaos, innovation awakens. In the maze of danger, legends rise.",
    about: [
      "Minefield Rescue is an intense robotics challenge by IETE-SF. Teams design and control a bot through a perilous maze, where precision, strategy and teamwork are everything.",
      "The arena was a high-stakes minefield labyrinth filled with hidden threats and uncertainty. The mission: navigate carefully, outmaneuver obstacles and rescue hostages. One wrong move could change everything, so every decision had to count.",
      "It was a true test of who could handle the upside-down of robotics, and prove their mettle.",
    ],
    highlights: [
      "A minefield labyrinth filled with hidden threats",
      "Hostage rescue missions that reward precision",
      "Bot design and control under pressure",
      "Part of Tech Udbhav",
    ],
    winners: [
      {
        position: "1st",
        name: "Four Wheels",
        members: ["Ujjwal Kumar", "Ayush Kumar", "Ankit Kumar", "Ayush Kumar"],
      },
      {
        position: "2nd",
        name: "Devil",
        members: [
          "Krish Kumar Saw",
          "Harshit Raj Gupta",
          "Pranav Gupta",
          "Preeti Paul",
        ],
      },
      {
        position: "3rd",
        name: "Steel Slayers",
        members: ["Siddharth Mishra", "Himanshu Prasad", "Vinit Sharma"],
      },
    ],
  },

  "Robo Soccer": {
    tagline:
      "Success is not final, failure is not fatal: it is the courage to continue that counts. — Winston Churchill",
    about: [
      "Robo Soccer is football with a twist: the players aren't humans but manually controlled robots. Whether you are passionate about technology, love the game or are simply curious, it promised an exciting experience.",
      "From crafting your own robot to watching it battle in the arena, there was plenty to explore and enjoy as the bots went head-to-head in intense matches.",
      "Organized by the IETE Students' Forum as the ultimate bot showdown: build your squad, take part in the action and see you on the battleground.",
    ],
    highlights: [
      "Football played by manually controlled robots",
      "Head-to-head matches in a live arena",
      "Build your own robot and your own squad",
      "Part of Tech Udbhav",
    ],
    winners: [
      {
        position: "1st",
        name: "Steel Slayers",
        members: ["Saurav (Leader)", "Siddharth", "Himanshu"],
      },
      {
        position: "2nd",
        name: "Phoenix",
        members: ["Dhruv (Leader)", "Prithvi", "Krishna"],
      },
      {
        position: "3rd",
        name: "4Wheels",
        members: ["Ujjwal (Leader)", "Ankit", "Ayush"],
      },
    ],
  },

  "Cloak Coding": {
    tagline:
      "Programming mastery isn't just about what you see, it's about what you can envision.",
    about: [
      "IETE-SF summoned participants to Cloak Coding, an experimental challenge designed to push coding skills past the limit. No live previews, no real-time logs: the code is written entirely in the shadows.",
      "With the visual interface severed, participants had to architect complex logic, optimize algorithms and debug \"ghost\" errors without any visual feedback. Their only tools were pure intuition and tactical composure.",
      "A chance to test their technical threshold, meet fellow coders and discover the hidden artistry that only reveals itself in total uncertainty.",
    ],
    highlights: [
      "Code with no visual previews or real-time logs",
      "Complex logic and algorithm optimization",
      "Debug errors without visual feedback",
      "Part of Tech Udbhav",
    ],
    winners: [
      { position: "1st", name: "Abhishek Das", members: ["CSE Cyber"] },
      { position: "2nd", name: "Prince Kumar Singh", members: ["CSE Cyber"] },
      { position: "3rd", name: "Chaitanya Anand", members: ["CSE Cyber"] },
    ],
  },

  SensorSync: {
    tagline:
      "True innovation isn't just about building what you see, but syncing your vision with reality.",
    about: [
      "IETE-SF presented SensorSync, an innovation challenge designed to push prototyping limits. Unlike traditional contests, it was a two-stage journey from virtual simulation to physical implementation.",
      "Participants executed complex engineering tasks across two dimensions: architecting circuits in a digital environment, then building from a mystery box of components, relying on technical prowess and adaptability under pressure.",
      "They experienced the complete creation cycle, from the first spark to the final build, while working within strict time and resource constraints.",
    ],
    highlights: [
      "Two stages: virtual simulation and physical build",
      "Circuit design in a digital environment",
      "A mystery box of components to build with",
      "Strict time and resource constraints",
    ],
    winners: [
      {
        position: "1st",
        name: "Marcos.dev",
        members: ["Shresth Kumar", "Priyanshu Raj", "Suman Saurabh"],
      },
      {
        position: "2nd",
        name: "Team Trapezoid",
        members: ["Dhruv Prasad", "Nitish Kumar", "Nandan Kumar Sahu"],
      },
      {
        position: "3rd",
        name: "Team Sentinels",
        members: [
          "Ayush Mishra",
          "Ridhima Pandey",
          "Kabya Lall",
          "Rishav Kerketta",
        ],
      },
    ],
  },

  "Realm of Betrayal": {
    tagline:
      "Trust is a fragile bridge; one crack is all it takes for the whole structure to fall.",
    about: [
      "IETE-SF summoned participants to Realm of Betrayal, a high-stakes gauntlet designed to push composure to the limit. Groups of four united their logic to solve complex technical riddles before time ran out.",
      "Once the technical hunt ended, the atmosphere shifted into a game of deep-seated suspicion. Teams ran a \"human diagnostic\" to detect and expose a hidden saboteur embedded within their own ranks.",
      "The event concluded with an extraordinary test of memory and focus, where only those who kept their tactical composure and accurately recalled intricate patterns under pressure emerged victorious.",
    ],
    highlights: [
      "Teams of four solving technical riddles against the clock",
      "A hidden saboteur inside every team",
      "A final test of memory and pattern recall",
      "3 rounds, 1 winner, zero trust",
    ],
    winners: [
      { position: "1st", name: "4 Intruders", members: ["Sujal Kumar (Civil)"] },
      {
        position: "2nd",
        name: "Circuit Capitals",
        members: [
          "Ashish Kumar",
          "Sudhir Kumar",
          "Ahan Lodha (Electrical)",
        ],
      },
      {
        position: "3rd",
        name: "Mega Star",
        members: ["Kriti Kumari (Electrical)"],
      },
    ],
  },

  Technogram: {
    about: [
      "Technogram was a two-level innovation challenge under Tech Udbhav, inviting school students to engineer practical solutions for rural communities by combining sustainable hardware, resilient software and social empathy.",
      "These young innovators proved that technology can truly transform the grassroots.",
    ],
    winners: [
      { position: "1st", name: "Science Queens" },
      { position: "2nd", name: "Science Explorers" },
      { position: "3rd", name: "Green Warriors" },
    ],
  },

  "Vibe-a-thon": {
    tagline: "The future belongs to those who know how to vibe with technology.",
    about: [
      "VIBE-A-THON: where code meets AI creativity. A next-gen vibe coding hackathon hosted by the IETE Students' Forum, BIT Sindri.",
      "The event was designed for people who love development and want to learn and use AI tools to build powerful full-stack projects.",
    ],
    highlights: [
      "A vibe coding hackathon powered by AI tools",
      "Build full-stack projects from creative ideas",
      "Two rounds: PPT submission, then the final round",
      "Hosted by the IETE Students' Forum, BIT Sindri",
    ],
    info: {
      "Round 1 (PPT)": "20 January 2026",
      "Round 2 (Final)": "28 January 2026",
    },
  },

  "BGMI Campus Combat": {
    tagline: "Legends aren't born, they are made on the battleground!",
    about: [
      "BGMI Campus Combat was a chance to showcase your skills, outplay your opponents and claim ultimate glory, with high-intensity action, edge-of-the-seat battles and heart-racing moments on the way to the top.",
      "Hosted by the IETE Students' Forum of BIT Sindri, it was an electrifying gaming showdown that celebrated skill, teamwork and the true spirit of esports. Squads assembled, strategised their attacks and fought to be the last squad standing.",
    ],
    highlights: [
      "Squad-based BGMI esports showdown",
      "High-intensity battles to be the last squad standing",
      "Skill, strategy and teamwork on display",
      "Hosted by the IETE Students' Forum, BIT Sindri",
    ],
  },

  Nexus: nexus,
  "Nexus 3.0": nexus,

  "Clue-e-minati": clueeminati,
  "Clue-e-minati Adventure": clueeminati,
};

export default eventDetails;