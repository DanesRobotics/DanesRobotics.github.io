/**
 * TEAM FACTS AND COPY
 * Edit this file to change team info, story text, stats, contact, and sub-teams.
 * Do not put student or staff names anywhere on the site.
 */
window.SITE_DATA = {
  teamName: "Danes Robotics",
  teamNumber: "11174",
  school: "Denmark High School",
  location: "Alpharetta, Georgia",
  program: "FIRST Robotics Competition",
  rookieSeason: 2026,
  currentSeasonNote: "Now in our second season.",
  gameRookie: "REBUILT",

  email: "denmarkfrc@gmail.com",
  instagram: {
    handle: "@DanesFRC",
    url: "https://www.instagram.com/danesfrc"
  },
  // TODO: replace with the official TikTok URL when it is ready.
  tiktok: {
    handle: "@DanesFRC",
    url: "#",
    placeholder: true
  },

  hero: {
    kicker: "FRC Team 11174",
    title: "Danes Robotics",
    lede: "Denmark High School students building robots, community, and a competitive FIRST team from the ground up.",
    primaryCta: { label: "Meet the team", href: "about.html" },
    secondaryCta: { label: "Become a sponsor", href: "sponsors.html" }
  },

  storyShort:
    "Danes Robotics was founded by a small group of students who believed Denmark High School deserved the chance to compete in FIRST Robotics. There was no existing program and no experience. With the help of a teacher, they secured tools, gathered materials, and built the team piece by piece.",
  story:
    "Danes Robotics was founded by a small group of students who believed Denmark High School students deserved the chance to compete in the FIRST Robotics Competition. There was no existing program and no experience. With the help of a teacher they secured tools, gathered materials, and built the team piece by piece, growing into a competitive team in two seasons.",

  // Social reach from the first season. Update the number here; the home page counts up to it.
  socialViews: 300000,
  socialViewsLabel: "300,000+",

  // TODO: add robot name, photos, and mechanism details when ready.
  robot: {
    year: 2026,
    game: "REBUILT",
    name: "",
    summary:
      "Our rookie robot was built for the 2026 REBUILT season. Photos, CAD, and mechanism notes will live here as they are released.",
    photo: "images/photos/robot-2026.jpg"
  },

  subteams: [
    {
      id: "business",
      name: "Business",
      summary:
        "Secures resources, communicates with sponsors, and keeps the team financially organized and visible."
    },
    {
      id: "programming",
      name: "Programming",
      summary:
        "Writes the code that brings robot mechanisms and driver controls to life."
    },
    {
      id: "mechanical",
      name: "Mechanical",
      summary:
        "Builds and assembles the mechanisms that power the robot."
    },
    {
      id: "electrical",
      name: "Electrical",
      summary:
        "Wires the systems connecting every part of the robot."
    }
  ]
};
