const router = require('express').Router();

const FAQ_DATA = [
  {
    question: 'What is a novel coronavirus?',
    answer: [
      'A novel coronavirus is a new coronavirus that has not been previously identified.'
      + ' The virus causing coronavirus disease 2019 (COVID-19), is not the same as the coronaviruses that commonly circulate among humans and cause mild illness, like the common cold.',
    ],
  },
  {
    question: 'How does the virus spread?',
    answer: [
      'The virus that causes COVID-19 is thought to spread mainly from person to person, mainly through respiratory droplets produced when an infected person coughs, sneezes, or talks.',
      'These droplets can land in the mouths or noses of people who are nearby or possibly be inhaled into the lungs. Spread is more likely when people are in close contact with one another (within about 6 feet).',
    ],
  },
  {
    question: 'Can the virus that causes COVID-19 be spread through food, including restaurant take out, refrigerated or frozen packaged food?',
    answer: [
      'Coronaviruses are generally thought to be spread from person to person through respiratory droplets. Currently, there is no evidence to support transmission of COVID-19 associated with food.',
      ' Before preparing or eating food it is important to always wash your hands with soap and water for at least 20 seconds for general food safety. ',
      'Coronaviruses are generally thought to be spread from person to person through respiratory droplets. Currently, there is no evidence to support transmission of COVID-19 associated with food.',
    ],
  },
  {
    question: 'Will warm weather stop the outbreak of COVID-19?',
    answer: [
      'It is not yet known whether weather and temperature affect the spread of COVID-19. Some other viruses, like those that cause the common cold and flu,'
      + 'spread more during cold weather months but that does not mean it is impossible to become sick with these viruses during other months.',
      'There is much more to learn about the transmissibility, severity, and other features associated with COVID-19 and investigations are ongoing.',
    ],
  },
  {
    question: 'What is community spread?',
    answer: [
      'Community spread means people have been infected with the virus in an area, including some who are not sure how or where they became infected.'
      + ' Each health department determines community spread differently based on local conditions.',
    ],
  },
  {
    question: 'Can mosquitoes or ticks spread the virus that causes COVID-19?',
    answer: [
      'At this time, CDC has no data to suggest that this new coronavirus or other similar coronaviruses are spread by mosquitoes or ticks.'
      + ' The main way that COVID-19 spreads is from person to person.',
    ],
  },
  {
    question: 'How can I protect myself?',
    answer: [
      'Wash your hands often with soap and water for at least 20 seconds especially after you have been in a public place, or after blowing your nose, coughing, or sneezing.',
      'Avoid close contact with people who are sick. If possible, maintain 6 feet between the person who is sick and other household members.',
      'Put 6 feet of distance between yourself and people who don’t live in your household.',
      'Wear a cloth face cover in public settings and when around people who don’t live in your household, especially when other social distancing measures are difficult to maintain.',
      'Always cover your mouth and nose with a tissue when you cough or sneeze or use the inside of your elbow and do not spit.',
      'Clean AND disinfect frequently touched surfaces daily. This includes tables, doorknobs, light switches, countertops, handles, desks, phones, keyboards, toilets, faucets, and sinks.',
      'Be alert for symptoms. Watch for fever, cough, shortness of breath, or other symptoms of COVID-19.',
    ],
  },
  {
    question: 'Does CDC recommend the use of facemask or face coverings to prevent COVID-19?',
    answer: [
      'Wear cloth face coverings in public settings when around people not living in your household and particularly where other social distancing measures are difficult to maintain, such as grocery stores, pharmacies, and gas stations. Cloth face coverings may slow the spread of the virus and help people who may have the virus and do not know it from transmitting it to others.',
      'COVID-19 can be spread by people who do not have symptoms and do not know that they are infected. That’s why it’s important for everyone to practice social distancing (staying at least 6 feet away from other people) and wear cloth face coverings in public settings. Cloth face coverings provide an extra layer to help prevent the respiratory droplets from traveling in the air and onto other people.',
      'The cloth face coverings recommended are not surgical masks or N-95 respirators.  Those are critical supplies that must continue to be reserved for healthcare workers and other medical first responders, as recommended by current CDC guidance.',
    ],
  },
  {
    question: 'Is it safe to get care for my other medical conditions during this time?',
    answer: [
      'It is important to continue taking care of your health and wellness.',
      'Continue your medications, and do not change your treatment plan without talking to your healthcare provider.',
      'Continue to manage your disease the way your healthcare provider has told you.',
      'Have at least a 2-week supply of all prescription and non-prescription medications.',
      'Talk to your healthcare provider about whether your vaccinations are up-to-date.',
      'Do not delay getting emergency care for your health problems or any health condition that requires immediate attention.',
      'Continue to practice everyday prevention. Wash your hands often, avoid close contact, wear a cloth face covering, cover coughs and sneezes, and clean and disinfect frequently touched surfaces often.',
    ],
  },
  {
    question: 'Am I at risk for COVID-19 from mail, packages, or products?',
    answer: [
      'There is still a lot that is unknown about COVID-19 and how it spreads. Coronaviruses are thought to be spread most often by respiratory droplets.'
      + ' Although the virus can survive for a short period on some surfaces, it is unlikely to be spread from domestic or international mail, products or packaging.',
      'However, it may be possible that people can get COVID-19 by touching a surface or object that has the virus on it and then touching their own mouth, nose, or possibly their eyes, but this is not thought to be the main way the virus spreads.',
    ],
  },
  {
    question: 'Is it okay for me to donate blood?',
    answer: [
      'In healthcare settings across the United States, donated blood is a lifesaving, essential part of caring for patients. The need for donated blood is constant, and blood centers are open and in urgent need of donations. CDC encourages people who are well to continue to donate blood if they are able, even if they are practicing social distancing because of COVID-19. CDC is supporting blood centers by providing recommendations that will keep donors and staff safe. Examples of these recommendations include spacing donor chairs 6 feet apart, thoroughly adhering to environmental cleaning practices, and encouraging donors to make donation appointments ahead of time.',
    ],
  },
  {
    question: 'Should contact lens wearers take special precautions to prevent COVID-19?',
    answer: [
      'Currently there is no evidence to suggest contact lens wearers are more at risk for acquiring COVID-19 than eyeglass wearers.',
      'Contact lens wearers should continue to practice safe contact lens wear and care hygiene habits to help prevent against transmission of any contact lens-related infections, such as always washing hands with soap and water before handling lenses.',
      'People who are healthy can continue to wear and care for their contact lenses as prescribed by their eye care professional.',
    ],
  },
  {
    question: 'Is contact lens disinfecting solution effective against COVID-19?',
    answer: [
      'Hydrogen peroxide-based systems for cleaning, disinfecting, and storing contact lenses should be effective against the virus that causes COVID-19.',
      'Always use solution to disinfect your contact lenses and case to kill germs that may be present.',
      'Handle your lenses over a surface that has been cleaned and disinfected.',
    ],
  },
  {
    question: 'Should I use soap and water or hand sanitizer to protect against COVID-19?',
    answer: [
      'Handwashing is one of the best ways to protect yourself and your family from getting sick.'
      + ' Wash your hands often with soap and water for at least 20 seconds, especially after blowing your nose, coughing, or sneezing; going to the bathroom; and before eating or preparing food.'
      + ' If soap and water are not readily available, use an alcohol-based hand sanitizer with at least 60% alcohol.',
    ],
  },
  {
    question: 'What cleaning products should I use to protect against COVID-19?',
    answer: [
      'Clean and disinfect frequently touched surfaces such as tables, doorknobs, light switches, countertops, handles, desks, phones, keyboards, toilets, faucets, and sinks.'
      + 'If surfaces are dirty, clean them using detergent or soap and water prior to disinfection. To disinfect, most common EPA-registered household disinfectants will work.',
    ],
  },
];

router.get('/', async (req, res) => res.status(200).json({ data: FAQ_DATA }));

module.exports = router;
