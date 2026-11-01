import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

type Exercise = {
  type: "SELECT" | "ASSIST";
  question: string;
  options: { text: string; correct: boolean }[];
};

const select = (
  question: string,
  answer: string,
  alternatives: [string, string]
): Exercise => ({
  type: "SELECT",
  question,
  options: [
    { text: answer, correct: true },
    ...alternatives.map((text) => ({ text, correct: false })),
  ],
});

const assist = (
  prompt: string,
  answer: string,
  alternatives: [string, string]
): Exercise => ({
  type: "ASSIST",
  question: prompt,
  options: [
    { text: answer, correct: true },
    ...alternatives.map((text) => ({ text, correct: false })),
  ],
});

const frenchCurriculum: {
  title: string;
  description: string;
  lessons: { title: string; exercises: Exercise[] }[];
}[] = [
  {
    title: "A2 · Voyages et hébergement",
    description: "Handle bookings, transport, directions, and travel problems.",
    lessons: [
      {
        title: "Booking a room",
        exercises: [
          {
            type: "SELECT",
            question:
              "Choose the French translation: I would like a room for two nights.",
            options: [
              {
                text: "Je voudrais une chambre pour deux nuits.",
                correct: true,
              },
              {
                text: "J'ai réservé une table pour deux personnes.",
                correct: false,
              },
              {
                text: "Nous resterons chez nos amis pendant deux mois.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question: "Est-ce que le petit-déjeuner est compris dans le prix ?",
            options: [
              { text: "Is breakfast included in the price?", correct: true },
              { text: "Can I pay the bill in the restaurant?", correct: false },
              { text: "Is the train station near the hotel?", correct: false },
            ],
          },
          {
            type: "SELECT",
            question:
              "Choose the French translation: The hotel is opposite the station.",
            options: [
              { text: "L'hôtel se trouve en face de la gare.", correct: true },
              { text: "L'hôtel se trouve au bout de la rue.", correct: false },
              { text: "La gare est derrière l'aéroport.", correct: false },
            ],
          },
          {
            type: "ASSIST",
            question: "Nous aimerions annuler notre réservation.",
            options: [
              {
                text: "We would like to cancel our reservation.",
                correct: true,
              },
              { text: "We would like to extend our stay.", correct: false },
              { text: "We have already paid for breakfast.", correct: false },
            ],
          },
        ],
      },
      {
        title: "Getting around",
        exercises: [
          {
            type: "SELECT",
            question:
              "Choose the French translation: Which platform does the train leave from?",
            options: [
              { text: "De quel quai part le train ?", correct: true },
              { text: "À quelle heure ferme la billetterie ?", correct: false },
              { text: "Où peut-on louer une voiture ?", correct: false },
            ],
          },
          {
            type: "ASSIST",
            question: "Vous devez changer à Lyon et prendre le train suivant.",
            options: [
              {
                text: "You have to change in Lyon and take the next train.",
                correct: true,
              },
              {
                text: "You have to buy a ticket before leaving Lyon.",
                correct: false,
              },
              {
                text: "Your train will arrive in Lyon later than expected.",
                correct: false,
              },
            ],
          },
          {
            type: "SELECT",
            question:
              "Choose the French translation: Could you show me the way to the old town?",
            options: [
              {
                text: "Pourriez-vous m'indiquer le chemin vers la vieille ville ?",
                correct: true,
              },
              {
                text: "Pourriez-vous me réserver une chambre dans le centre ?",
                correct: false,
              },
              {
                text: "Savez-vous où se trouve la prochaine station-service ?",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question: "Le bus est en retard à cause des travaux.",
            options: [
              {
                text: "The bus is late because of the roadworks.",
                correct: true,
              },
              { text: "The bus is full, so we have to walk.", correct: false },
              {
                text: "The roadworks have closed the train station.",
                correct: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "A2 · Santé et vie quotidienne",
    description: "Talk about routines, health, and everyday needs.",
    lessons: [
      {
        title: "At the pharmacy",
        exercises: [
          {
            type: "SELECT",
            question:
              "Choose the French translation: I've had a headache since yesterday.",
            options: [
              { text: "J'ai mal à la tête depuis hier.", correct: true },
              {
                text: "J'avais mal au dos la semaine dernière.",
                correct: false,
              },
              {
                text: "Je prends ce médicament après le déjeuner.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question: "Faut-il prendre ce médicament avant ou après le repas ?",
            options: [
              {
                text: "Should I take this medicine before or after a meal?",
                correct: true,
              },
              {
                text: "Can I make an appointment before lunch?",
                correct: false,
              },
              {
                text: "Does this restaurant serve meals after midnight?",
                correct: false,
              },
            ],
          },
          {
            type: "SELECT",
            question:
              "Choose the French translation: You should rest for a few days.",
            options: [
              {
                text: "Vous devriez vous reposer pendant quelques jours.",
                correct: true,
              },
              {
                text: "Vous devez revenir dans quelques semaines.",
                correct: false,
              },
              { text: "Tu t'es reposé toute la journée hier.", correct: false },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Je suis allergique aux noix, mais je peux manger des amandes.",
            options: [
              {
                text: "I'm allergic to nuts, but I can eat almonds.",
                correct: true,
              },
              {
                text: "I'm looking for a pharmacy that sells vitamins.",
                correct: false,
              },
              {
                text: "I have a toothache, but I can still eat.",
                correct: false,
              },
            ],
          },
        ],
      },
      {
        title: "Habits and comparisons",
        exercises: [
          {
            type: "SELECT",
            question:
              "Choose the French translation: I used to walk to work, but now I take the bus.",
            options: [
              {
                text: "Avant, j'allais au travail à pied, mais maintenant je prends le bus.",
                correct: true,
              },
              {
                text: "Hier, je suis allé au travail en voiture et je rentrerai en bus.",
                correct: false,
              },
              {
                text: "Je prends le bus pour aller travailler depuis une heure.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Ce quartier est moins bruyant que celui où j'habitais avant.",
            options: [
              {
                text: "This neighbourhood is less noisy than the one where I used to live.",
                correct: true,
              },
              {
                text: "This neighbourhood is farther away than the one I visited.",
                correct: false,
              },
              {
                text: "I used to live in a neighbourhood that was less expensive.",
                correct: false,
              },
            ],
          },
          {
            type: "SELECT",
            question:
              "Choose the French translation: She has been learning French for two years.",
            options: [
              {
                text: "Elle apprend le français depuis deux ans.",
                correct: true,
              },
              {
                text: "Elle a appris le français pendant deux ans, puis elle a arrêté.",
                correct: false,
              },
              {
                text: "Elle apprendra le français dans deux ans.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question: "Il y a autant de monde le samedi que le dimanche.",
            options: [
              {
                text: "There are as many people on Saturday as on Sunday.",
                correct: true,
              },
              {
                text: "There are fewer people on Saturday than on Sunday.",
                correct: false,
              },
              {
                text: "The shops are open every Saturday and Sunday.",
                correct: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "A2 · Projets et imprévus",
    description: "Make plans, explain problems, and talk about past events.",
    lessons: [
      {
        title: "Making plans",
        exercises: [
          {
            type: "SELECT",
            question:
              "Choose the French translation: If the weather is nice, we'll have a picnic.",
            options: [
              {
                text: "S'il fait beau, on fera un pique-nique.",
                correct: true,
              },
              {
                text: "Même s'il pleut, on a fait un pique-nique.",
                correct: false,
              },
              { text: "Il faisait beau quand on est rentrés.", correct: false },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Je suis en train de chercher un appartement plus près de mon travail.",
            options: [
              {
                text: "I'm looking for an apartment closer to my workplace.",
                correct: true,
              },
              {
                text: "I've just moved into an apartment near my workplace.",
                correct: false,
              },
              {
                text: "I used to work in an apartment building.",
                correct: false,
              },
            ],
          },
          {
            type: "SELECT",
            question:
              "Choose the French translation: We haven't decided where to spend the holidays yet.",
            options: [
              {
                text: "Nous n'avons pas encore décidé où passer les vacances.",
                correct: true,
              },
              {
                text: "Nous avons décidé de rentrer avant les vacances.",
                correct: false,
              },
              {
                text: "Nous ne partons jamais en vacances en hiver.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question: "Tu pourrais m'aider à porter ces cartons ?",
            options: [
              { text: "Could you help me carry these boxes?", correct: true },
              { text: "Could you help me pack my suitcase?", correct: false },
              {
                text: "Can you tell me where to buy some boxes?",
                correct: false,
              },
            ],
          },
        ],
      },
      {
        title: "Explaining what happened",
        exercises: [
          {
            type: "SELECT",
            question:
              "Choose the French translation: I missed the bus because I couldn't find my keys.",
            options: [
              {
                text: "J'ai raté le bus parce que je ne trouvais pas mes clés.",
                correct: true,
              },
              {
                text: "J'ai pris le bus avant de chercher mes clés.",
                correct: false,
              },
              {
                text: "Je ratais toujours le bus quand je travaillais ici.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question: "Pendant que nous dînions, quelqu'un a sonné à la porte.",
            options: [
              {
                text: "While we were having dinner, someone rang the doorbell.",
                correct: true,
              },
              {
                text: "After dinner, we knocked on our neighbour's door.",
                correct: false,
              },
              {
                text: "Someone rang the doorbell before we started cooking.",
                correct: false,
              },
            ],
          },
          {
            type: "SELECT",
            question:
              "Choose the French translation: She had already left when I arrived.",
            options: [
              {
                text: "Elle était déjà partie quand je suis arrivé.",
                correct: true,
              },
              { text: "Elle est partie après mon arrivée.", correct: false },
              {
                text: "Elle partait quand je l'ai appelée demain.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Nous avons dû reporter la réunion à cause d'un problème technique.",
            options: [
              {
                text: "We had to postpone the meeting because of a technical problem.",
                correct: true,
              },
              {
                text: "We cancelled the meeting because nobody had arrived.",
                correct: false,
              },
              {
                text: "We had a technical meeting after the problem was fixed.",
                correct: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "B1 · Récits et expériences",
    description:
      "Narrate events clearly and distinguish background from completed actions.",
    lessons: [
      {
        title: "Telling a story",
        exercises: [
          {
            type: "SELECT",
            question:
              "Choose the French translation: It was raining when we left the museum.",
            options: [
              {
                text: "Il pleuvait quand nous avons quitté le musée.",
                correct: true,
              },
              {
                text: "Il a plu avant que nous quittions le musée demain.",
                correct: false,
              },
              {
                text: "Nous quittions le musée parce qu'il fera beau.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question: "Je n'avais jamais vu la mer avant ce voyage.",
            options: [
              {
                text: "I had never seen the sea before that trip.",
                correct: true,
              },
              {
                text: "I never went to the seaside during that trip.",
                correct: false,
              },
              {
                text: "I have not seen the sea since last summer.",
                correct: false,
              },
            ],
          },
          {
            type: "SELECT",
            question:
              "Choose the French translation: As soon as she heard the news, she called her brother.",
            options: [
              {
                text: "Dès qu'elle a appris la nouvelle, elle a appelé son frère.",
                correct: true,
              },
              {
                text: "Avant d'apprendre la nouvelle, elle a appelé son frère.",
                correct: false,
              },
              {
                text: "Pendant qu'elle appelait son frère, elle lisait les nouvelles.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Le spectacle avait déjà commencé lorsque nous sommes arrivés.",
            options: [
              {
                text: "The show had already started when we arrived.",
                correct: true,
              },
              {
                text: "The show started as soon as we arrived.",
                correct: false,
              },
              {
                text: "We arrived before the show had been announced.",
                correct: false,
              },
            ],
          },
        ],
      },
      {
        title: "Sharing life experiences",
        exercises: [
          {
            type: "SELECT",
            question:
              "Choose the French translation: Have you ever worked abroad?",
            options: [
              { text: "As-tu déjà travaillé à l'étranger ?", correct: true },
              {
                text: "Travailleras-tu à l'étranger l'année prochaine ?",
                correct: false,
              },
              {
                text: "Pourquoi as-tu quitté ton travail à l'étranger ?",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question: "J'ai fini par m'habituer au rythme de la ville.",
            options: [
              {
                text: "I eventually got used to the pace of the city.",
                correct: true,
              },
              {
                text: "I decided to leave the city before getting used to it.",
                correct: false,
              },
              {
                text: "I have always preferred the countryside to the city.",
                correct: false,
              },
            ],
          },
          {
            type: "SELECT",
            question:
              "Choose the French translation: I have lived here since I finished university.",
            options: [
              {
                text: "J'habite ici depuis que j'ai fini l'université.",
                correct: true,
              },
              {
                text: "J'habitais ici avant d'entrer à l'université.",
                correct: false,
              },
              {
                text: "J'habiterai ici jusqu'à la fin de l'université.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Ce qui m'a le plus surpris, c'est la facilité avec laquelle elle s'est intégrée.",
            options: [
              {
                text: "What surprised me most was how easily she settled in.",
                correct: true,
              },
              {
                text: "What impressed her most was how difficult it was to fit in.",
                correct: false,
              },
              {
                text: "She was surprised that I had already settled in.",
                correct: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "B1 · Opinions et relations",
    description:
      "Express opinions, make suggestions, and handle disagreements.",
    lessons: [
      {
        title: "Giving an opinion",
        exercises: [
          {
            type: "SELECT",
            question:
              "Choose the French translation: In my opinion, public transport should be cheaper.",
            options: [
              {
                text: "À mon avis, les transports en commun devraient être moins chers.",
                correct: true,
              },
              {
                text: "À mon avis, les transports privés seront toujours gratuits.",
                correct: false,
              },
              {
                text: "Je pense que les transports en commun étaient trop rapides.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Je comprends ton point de vue, même si je ne suis pas tout à fait d'accord.",
            options: [
              {
                text: "I understand your point of view, even though I don't entirely agree.",
                correct: true,
              },
              {
                text: "I agree with you because we have the same point of view.",
                correct: false,
              },
              {
                text: "I don't understand your point of view at all.",
                correct: false,
              },
            ],
          },
          {
            type: "SELECT",
            question:
              "Choose the French translation: This solution is not only cheaper but also more practical.",
            options: [
              {
                text: "Cette solution est non seulement moins chère, mais aussi plus pratique.",
                correct: true,
              },
              {
                text: "Cette solution est aussi chère que la précédente, mais moins pratique.",
                correct: false,
              },
              {
                text: "Cette solution n'est ni pratique ni facile à trouver.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Il vaut mieux vérifier les informations avant de les partager.",
            options: [
              {
                text: "It's better to check information before sharing it.",
                correct: true,
              },
              {
                text: "You should share the information before checking it.",
                correct: false,
              },
              {
                text: "The information is too important to discuss.",
                correct: false,
              },
            ],
          },
        ],
      },
      {
        title: "Making suggestions",
        exercises: [
          {
            type: "SELECT",
            question:
              "Choose the French translation: We could try a different approach.",
            options: [
              {
                text: "Nous pourrions essayer une autre approche.",
                correct: true,
              },
              {
                text: "Nous avons essayé cette approche sans succès.",
                correct: false,
              },
              {
                text: "Nous devons expliquer notre approche demain.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Si j'étais à ta place, j'en parlerais directement avec elle.",
            options: [
              {
                text: "If I were you, I'd talk to her about it directly.",
                correct: true,
              },
              {
                text: "If she were here, she would talk to you later.",
                correct: false,
              },
              {
                text: "I spoke to her directly when I was in your position.",
                correct: false,
              },
            ],
          },
          {
            type: "SELECT",
            question:
              "Choose the French translation: Would you mind explaining the problem again?",
            options: [
              {
                text: "Cela vous dérangerait-il d'expliquer encore le problème ?",
                correct: true,
              },
              {
                text: "Pourquoi avez-vous expliqué le problème si rapidement ?",
                correct: false,
              },
              {
                text: "Vous devriez résoudre le problème avant de l'expliquer.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Il faudrait que nous trouvions un compromis avant vendredi.",
            options: [
              {
                text: "We should find a compromise before Friday.",
                correct: true,
              },
              { text: "We found a compromise last Friday.", correct: false },
              {
                text: "We shouldn't discuss this compromise on Friday.",
                correct: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "B1 · Études et travail",
    description:
      "Communicate about work, applications, and professional plans.",
    lessons: [
      {
        title: "At work",
        exercises: [
          {
            type: "SELECT",
            question:
              "Choose the French translation: The report must be sent before the end of the day.",
            options: [
              {
                text: "Le rapport doit être envoyé avant la fin de la journée.",
                correct: true,
              },
              {
                text: "Le rapport a été reçu au début de la semaine.",
                correct: false,
              },
              {
                text: "Nous enverrons le rapport après la prochaine réunion.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Je suis chargé de coordonner l'équipe et de respecter les délais.",
            options: [
              {
                text: "I'm responsible for coordinating the team and meeting deadlines.",
                correct: true,
              },
              {
                text: "I'm hoping to join the team before the deadline.",
                correct: false,
              },
              {
                text: "The team asked me to postpone the deadlines.",
                correct: false,
              },
            ],
          },
          {
            type: "SELECT",
            question:
              "Choose the French translation: She applied for a position that requires experience.",
            options: [
              {
                text: "Elle a postulé à un poste qui exige de l'expérience.",
                correct: true,
              },
              {
                text: "Elle a proposé une expérience à son ancienne équipe.",
                correct: false,
              },
              {
                text: "Elle a quitté un poste avant la fin de sa formation.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Bien que le projet soit ambitieux, nous pouvons le terminer à temps.",
            options: [
              {
                text: "Although the project is ambitious, we can finish it on time.",
                correct: true,
              },
              {
                text: "Because the project is late, we have to make it more ambitious.",
                correct: false,
              },
              {
                text: "The project is finished, even though it was not ambitious.",
                correct: false,
              },
            ],
          },
        ],
      },
      {
        title: "Planning a career",
        exercises: [
          {
            type: "SELECT",
            question:
              "Choose the French translation: After completing my degree, I intend to work in publishing.",
            options: [
              {
                text: "Après avoir terminé mes études, j'ai l'intention de travailler dans l'édition.",
                correct: true,
              },
              {
                text: "Avant de commencer mes études, je travaillais dans une bibliothèque.",
                correct: false,
              },
              {
                text: "J'ai terminé un livre pendant que je travaillais à l'université.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Cette formation me permettrait d'acquérir de nouvelles compétences.",
            options: [
              {
                text: "This training would enable me to acquire new skills.",
                correct: true,
              },
              {
                text: "This job requires me to teach new skills.",
                correct: false,
              },
              {
                text: "I acquired these skills before starting the training.",
                correct: false,
              },
            ],
          },
          {
            type: "SELECT",
            question:
              "Choose the French translation: The more you practise, the more confident you become.",
            options: [
              {
                text: "Plus tu t'entraînes, plus tu prends confiance en toi.",
                correct: true,
              },
              {
                text: "Tu t'entraînes moins quand tu as davantage confiance en toi.",
                correct: false,
              },
              {
                text: "Tu aurais eu confiance en toi si tu t'étais entraîné hier.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "À condition que ma candidature soit retenue, je commencerai en septembre.",
            options: [
              {
                text: "Provided that my application is successful, I'll start in September.",
                correct: true,
              },
              {
                text: "My application was rejected when I started in September.",
                correct: false,
              },
              {
                text: "I will apply again after the September deadline.",
                correct: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "B2 · Argumentation et société",
    description: "Build nuanced arguments and discuss social questions.",
    lessons: [
      {
        title: "Building an argument",
        exercises: [
          {
            type: "SELECT",
            question:
              "Choose the French translation: Although the measure is costly, it could reduce inequality.",
            options: [
              {
                text: "Bien que cette mesure soit coûteuse, elle pourrait réduire les inégalités.",
                correct: true,
              },
              {
                text: "Puisque cette mesure coûte cher, les inégalités ont déjà disparu.",
                correct: false,
              },
              {
                text: "Cette mesure est moins coûteuse que toutes les autres inégalités.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Encore faut-il que les résultats soient évalués de manière indépendante.",
            options: [
              {
                text: "The results still need to be evaluated independently.",
                correct: true,
              },
              {
                text: "The results were announced before the independent review.",
                correct: false,
              },
              {
                text: "The results prove that an evaluation is unnecessary.",
                correct: false,
              },
            ],
          },
          {
            type: "SELECT",
            question:
              "Choose the French translation: This argument overlooks the long-term consequences.",
            options: [
              {
                text: "Cet argument néglige les conséquences à long terme.",
                correct: true,
              },
              {
                text: "Cette conséquence met en évidence un argument récent.",
                correct: false,
              },
              {
                text: "Cet argument a été confirmé par les résultats à court terme.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Loin de résoudre le problème, cette décision risque de l'aggraver.",
            options: [
              {
                text: "Far from solving the problem, this decision risks making it worse.",
                correct: true,
              },
              {
                text: "This decision solved the problem despite the risks.",
                correct: false,
              },
              {
                text: "The problem is too serious for a decision to be made.",
                correct: false,
              },
            ],
          },
        ],
      },
      {
        title: "Debating public policy",
        exercises: [
          {
            type: "SELECT",
            question:
              "Choose the French translation: The reform would be effective, provided that it is properly funded.",
            options: [
              {
                text: "La réforme serait efficace, à condition qu'elle soit correctement financée.",
                correct: true,
              },
              {
                text: "La réforme a été financée après avoir cessé d'être efficace.",
                correct: false,
              },
              {
                text: "La réforme ne sera efficace que si son financement est supprimé.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Il ne s'agit pas d'interdire la voiture, mais d'offrir des solutions crédibles.",
            options: [
              {
                text: "The point is not to ban cars, but to offer credible alternatives.",
                correct: true,
              },
              {
                text: "The only credible solution is to ban every form of transport.",
                correct: false,
              },
              {
                text: "The cars were banned because no solutions were offered.",
                correct: false,
              },
            ],
          },
          {
            type: "SELECT",
            question:
              "Choose the French translation: The proposal deserves to be examined more closely.",
            options: [
              {
                text: "Cette proposition mérite d'être examinée de plus près.",
                correct: true,
              },
              {
                text: "Cette proposition a été examinée avant d'être présentée.",
                correct: false,
              },
              {
                text: "Cette proposition permet d'examiner les dossiers plus rapidement.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Quelles que soient les mesures adoptées, leur mise en œuvre prendra du temps.",
            options: [
              {
                text: "Whatever measures are adopted, implementing them will take time.",
                correct: true,
              },
              {
                text: "The measures were implemented before they were adopted.",
                correct: false,
              },
              {
                text: "The measures will take effect as soon as they are discussed.",
                correct: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "B2 · Médias et environnement",
    description:
      "Analyse media, sustainability, and cause-and-effect relationships.",
    lessons: [
      {
        title: "Media and information",
        exercises: [
          {
            type: "SELECT",
            question:
              "Choose the French translation: The article was widely shared before it was fact-checked.",
            options: [
              {
                text: "L'article a largement été partagé avant d'être vérifié.",
                correct: true,
              },
              {
                text: "L'article a été vérifié avant d'être partagé avec son auteur.",
                correct: false,
              },
              {
                text: "Les lecteurs ont partagé la vérification après la publication.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Faute de sources fiables, il est difficile de confirmer cette affirmation.",
            options: [
              {
                text: "Without reliable sources, it is difficult to confirm this claim.",
                correct: true,
              },
              {
                text: "Reliable sources have confirmed that this statement is false.",
                correct: false,
              },
              {
                text: "This claim is difficult to find because the sources are private.",
                correct: false,
              },
            ],
          },
          {
            type: "SELECT",
            question:
              "Choose the French translation: The report highlights how the debate has changed.",
            options: [
              {
                text: "Le rapport met en évidence l'évolution du débat.",
                correct: true,
              },
              {
                text: "Le débat a empêché la publication du rapport.",
                correct: false,
              },
              {
                text: "Le rapport a été modifié après le débat public.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Il convient de distinguer les faits des interprétations qui en sont faites.",
            options: [
              {
                text: "It is important to distinguish facts from the interpretations made of them.",
                correct: true,
              },
              {
                text: "The facts should be interpreted before they are distinguished.",
                correct: false,
              },
              {
                text: "The interpretations are more reliable than the facts.",
                correct: false,
              },
            ],
          },
        ],
      },
      {
        title: "Discussing the environment",
        exercises: [
          {
            type: "SELECT",
            question:
              "Choose the French translation: Unless consumption changes, emissions will continue to rise.",
            options: [
              {
                text: "À moins que la consommation ne change, les émissions continueront d'augmenter.",
                correct: true,
              },
              {
                text: "Les émissions ont diminué parce que la consommation a augmenté.",
                correct: false,
              },
              {
                text: "La consommation ne changera pas si les émissions diminuent.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "La transition ne pourra se faire sans un investissement massif dans les transports ferroviaires.",
            options: [
              {
                text: "The transition cannot happen without major investment in rail transport.",
                correct: true,
              },
              {
                text: "Rail transport will be replaced after the transition is complete.",
                correct: false,
              },
              {
                text: "The investment has already made the transition unnecessary.",
                correct: false,
              },
            ],
          },
          {
            type: "SELECT",
            question:
              "Choose the French translation: Had the policy been introduced earlier, the impact might have been greater.",
            options: [
              {
                text: "Si cette politique avait été mise en place plus tôt, son impact aurait peut-être été plus important.",
                correct: true,
              },
              {
                text: "Cette politique sera mise en place plus tard pour réduire son impact.",
                correct: false,
              },
              {
                text: "L'impact était important avant que cette politique soit annoncée.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Il ne suffit pas de sensibiliser le public ; encore faut-il lui donner les moyens d'agir.",
            options: [
              {
                text: "Raising public awareness is not enough; people must also be given the means to act.",
                correct: true,
              },
              {
                text: "The public already has the means to act, so awareness is unnecessary.",
                correct: false,
              },
              {
                text: "People should act before the public is made aware of the issue.",
                correct: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "B2 · Nuances et registre",
    description:
      "Use idiomatic expressions and adapt your language to formal contexts.",
    lessons: [
      {
        title: "Nuanced expressions",
        exercises: [
          {
            type: "SELECT",
            question:
              "Choose the French translation: He turned a blind eye to the warning signs.",
            options: [
              {
                text: "Il a fermé les yeux sur les signes avant-coureurs.",
                correct: true,
              },
              {
                text: "Il a remarqué les signes avant-coureurs à temps.",
                correct: false,
              },
              {
                text: "Il a ouvert les yeux dès qu'il a reçu l'avertissement.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Elle a beau maîtriser le sujet, elle préfère laisser les autres s'exprimer.",
            options: [
              {
                text: "Although she knows the subject well, she prefers to let others speak.",
                correct: true,
              },
              {
                text: "She speaks about the subject because nobody else understands it.",
                correct: false,
              },
              {
                text: "She has only just started learning about the subject.",
                correct: false,
              },
            ],
          },
          {
            type: "SELECT",
            question:
              "Choose the French translation: As far as I'm concerned, the decision is premature.",
            options: [
              {
                text: "En ce qui me concerne, cette décision est prématurée.",
                correct: true,
              },
              {
                text: "Pour autant que je sache, cette décision a été reportée.",
                correct: false,
              },
              {
                text: "La décision me concerne depuis plusieurs années.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Quoi qu'on en pense, cette expérience aura au moins permis d'ouvrir le débat.",
            options: [
              {
                text: "Whatever people think, this experience will at least have opened up the debate.",
                correct: true,
              },
              {
                text: "People agreed that the debate should end before the experiment.",
                correct: false,
              },
              {
                text: "The experience was debated before anyone could form an opinion.",
                correct: false,
              },
            ],
          },
        ],
      },
      {
        title: "Formal communication",
        exercises: [
          {
            type: "SELECT",
            question:
              "Choose the French translation: I am writing to enquire about the position advertised last week.",
            options: [
              {
                text: "Je me permets de vous contacter au sujet du poste publié la semaine dernière.",
                correct: true,
              },
              {
                text: "Je vous écris pour confirmer le poste que j'ai accepté hier.",
                correct: false,
              },
              {
                text: "Je vous appelle au sujet d'une annonce que vous publierez la semaine prochaine.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Je vous saurais gré de bien vouloir me faire parvenir les documents avant vendredi.",
            options: [
              {
                text: "I would be grateful if you could send me the documents before Friday.",
                correct: true,
              },
              {
                text: "I would like to send you the documents after Friday.",
                correct: false,
              },
              {
                text: "Please confirm that you received the documents last Friday.",
                correct: false,
              },
            ],
          },
          {
            type: "SELECT",
            question:
              "Choose the French translation: Should you require any further information, please do not hesitate to contact me.",
            options: [
              {
                text: "Si vous souhaitez obtenir des renseignements complémentaires, n'hésitez pas à me contacter.",
                correct: true,
              },
              {
                text: "Je vous contacterai lorsque j'aurai reçu tous les renseignements.",
                correct: false,
              },
              {
                text: "Vous trouverez les renseignements demandés dans le document ci-joint.",
                correct: false,
              },
            ],
          },
          {
            type: "ASSIST",
            question:
              "Dans l'attente de votre réponse, je vous prie d'agréer mes salutations distinguées.",
            options: [
              {
                text: "I look forward to your reply. Yours sincerely.",
                correct: true,
              },
              {
                text: "I have received your reply and would like to thank you.",
                correct: false,
              },
              {
                text: "Please accept my apologies for replying so late.",
                correct: false,
              },
            ],
          },
        ],
      },
    ],
  },
];

const spanishCurriculum: {
  title: string;
  description: string;
  lessons: { title: string; exercises: Exercise[] }[];
}[] = [
  {
    title: "A0 · Sons et premiers échanges",
    description:
      "Start from zero with Spanish sounds, greetings, and simple questions.",
    lessons: [
      {
        title: "The Spanish alphabet",
        exercises: [
          select("Choose the Spanish word for “house”.", "casa", [
            "queso",
            "cosa",
          ]),
          assist("¿Cómo se escribe tu nombre?", "How do you spell your name?", [
            "Where do you live?",
            "What is your surname?",
          ]),
        ],
      },
      {
        title: "Hello and goodbye",
        exercises: [
          select(
            "You meet someone in the morning. What do you say?",
            "Buenos días.",
            ["Buenas noches.", "Hasta mañana."]
          ),
          assist(
            "Hasta luego, nos vemos mañana.",
            "See you later; see you tomorrow.",
            ["Good evening, welcome.", "See you yesterday; take care."]
          ),
        ],
      },
      {
        title: "Introducing yourself",
        exercises: [
          select(
            "Choose the natural way to say “My name is Lucía.”",
            "Me llamo Lucía.",
            ["Tengo Lucía.", "Estoy Lucía."]
          ),
          assist("¿De dónde eres?", "Where are you from?", [
            "How old are you?",
            "Where are you going?",
          ]),
        ],
      },
      {
        title: "Pronouns and ser",
        exercises: [
          select("Complete: “Nosotros ___ estudiantes.”", "somos", [
            "son",
            "soy",
          ]),
          assist(
            "Ella es española y vive en Sevilla.",
            "She is Spanish and lives in Seville.",
            [
              "They are Spanish and live in Seville.",
              "She was in Spain and visited Seville.",
            ]
          ),
        ],
      },
      {
        title: "Numbers and age",
        exercises: [
          select("How do you say “thirty-two” in Spanish?", "treinta y dos", [
            "trece y dos",
            "veintidós",
          ]),
          assist("Tengo diecinueve años.", "I am nineteen years old.", [
            "I have nineteen brothers.",
            "I have lived here for nineteen years.",
          ]),
        ],
      },
    ],
  },
  {
    title: "A1 · Présentations et personnes",
    description:
      "Introduce yourself, describe people, and talk about family and work.",
    lessons: [
      {
        title: "Countries and nationalities",
        exercises: [
          select("Complete: “Marta es de México; es ___.”", "mexicana", [
            "mexicano",
            "México",
          ]),
          assist("¿Cuál es tu nacionalidad?", "What is your nationality?", [
            "What is your profession?",
            "Where is your neighbourhood?",
          ]),
        ],
      },
      {
        title: "Family members",
        exercises: [
          select("El hijo de mi madre es mi ___.", "hermano", [
            "abuelo",
            "tío",
          ]),
          assist(
            "Mi hermana menor estudia medicina.",
            "My younger sister studies medicine.",
            [
              "My older brother teaches medicine.",
              "My aunt is studying at the moment.",
            ]
          ),
        ],
      },
      {
        title: "Jobs and workplaces",
        exercises: [
          select(
            "Complete: “Mi padre trabaja en un hospital. Es ___.”",
            "médico",
            ["camarero", "periodista"]
          ),
          assist(
            "Trabajo como profesora en una escuela primaria.",
            "I work as a teacher in a primary school.",
            [
              "I study teaching at a university.",
              "She works as a doctor at a primary school.",
            ]
          ),
        ],
      },
      {
        title: "Articles and gender",
        exercises: [
          select("Choose the correct article: ___ problema es difícil.", "El", [
            "La",
            "Los",
          ]),
          assist("Una ciudad pequeña y tranquila.", "A small, quiet city.", [
            "A small, quiet country.",
            "Some old and noisy cities.",
          ]),
        ],
      },
      {
        title: "Plural nouns and adjectives",
        exercises: [
          select(
            "Choose the correct plural: “una mujer trabajadora”",
            "unas mujeres trabajadoras",
            ["unos mujeres trabajador", "unas mujer trabajadoras"]
          ),
          assist(
            "Mis primos son simpáticos y bastante altos.",
            "My cousins are friendly and quite tall.",
            [
              "My cousin is friendly and very tall.",
              "Your parents are quiet and rather short.",
            ]
          ),
        ],
      },
    ],
  },
  {
    title: "A1 · Les bases de la grammaire",
    description:
      "Build accurate present-tense sentences with essential verbs and questions.",
    lessons: [
      {
        title: "Ser and estar",
        exercises: [
          select("Complete: “Madrid ___ en España.”", "está", ["es", "están"]),
          assist(
            "Mi abuelo es médico, pero hoy está enfermo.",
            "My grandfather is a doctor, but today he is ill.",
            [
              "My grandfather is ill, but today he is a doctor.",
              "My grandparents are doctors and live here.",
            ]
          ),
        ],
      },
      {
        title: "The verb tener",
        exercises: [
          select("Complete: “¿Cuántos años ___ tu hermana?”", "tiene", [
            "tienes",
            "tienen",
          ]),
          assist(
            "Tenemos hambre, pero no tenemos prisa.",
            "We are hungry, but we are not in a hurry.",
            [
              "We are tired, but we do not have time.",
              "They are hungry and in a hurry.",
            ]
          ),
        ],
      },
      {
        title: "Regular -ar verbs",
        exercises: [
          select("Complete: “Yo ___ español todos los días.”", "practico", [
            "practicas",
            "practican",
          ]),
          assist(
            "Mis vecinos trabajan desde casa los viernes.",
            "My neighbours work from home on Fridays.",
            [
              "My neighbours are looking for a house on Friday.",
              "My neighbour worked at home last Friday.",
            ]
          ),
        ],
      },
      {
        title: "Regular -er and -ir verbs",
        exercises: [
          select("Complete: “Nosotros ___ en el centro.”", "vivimos", [
            "vive",
            "viven",
          ]),
          assist(
            "¿Qué comes normalmente para desayunar?",
            "What do you usually eat for breakfast?",
            [
              "What do you usually cook for dinner?",
              "When do you normally have breakfast?",
            ]
          ),
        ],
      },
      {
        title: "Negation and questions",
        exercises: [
          select(
            "Choose the natural translation of “I don't understand the question.”",
            "No entiendo la pregunta.",
            ["Entiendo no la pregunta.", "No entiendo pregunta la."]
          ),
          assist(
            "¿Por qué no puedes venir esta tarde?",
            "Why can't you come this afternoon?",
            [
              "When did you come this afternoon?",
              "Why do you want to leave this evening?",
            ]
          ),
        ],
      },
    ],
  },
  {
    title: "A1 · La vie quotidienne",
    description:
      "Talk about routines, meals, shopping, and the places where you live.",
    lessons: [
      {
        title: "Daily routines",
        exercises: [
          select("Complete: “Me ___ a las siete y media.”", "despierto", [
            "despierta",
            "despertamos",
          ]),
          assist(
            "Después de cenar, suelo leer un rato.",
            "After dinner, I usually read for a while.",
            [
              "Before dinner, I usually write for an hour.",
              "After lunch, I sometimes go for a walk.",
            ]
          ),
        ],
      },
      {
        title: "Food and meals",
        exercises: [
          select(
            "Choose a typical Spanish breakfast food.",
            "tostada con tomate",
            ["sopa de pescado", "arroz con leche"]
          ),
          assist(
            "Para la ensalada necesitamos tomates, aceite y un poco de sal.",
            "For the salad we need tomatoes, oil, and a little salt.",
            [
              "For the soup we need potatoes, milk, and some sugar.",
              "We need tomatoes and oil to make a shopping list.",
            ]
          ),
        ],
      },
      {
        title: "Ordering in a restaurant",
        exercises: [
          select(
            "Order politely: “I'd like the menu of the day, please.”",
            "Quisiera el menú del día, por favor.",
            [
              "Quiero pagar la cuenta de ayer.",
              "¿Dónde está la cocina del hotel?",
            ]
          ),
          assist(
            "¿Podría traer otra botella de agua?",
            "Could you bring another bottle of water?",
            [
              "Could you bring the bill tomorrow?",
              "Would you like another glass of wine?",
            ]
          ),
        ],
      },
      {
        title: "Shopping and prices",
        exercises: [
          select("Complete: “¿Cuánto ___ estas naranjas?”", "cuestan", [
            "cuesta",
            "costamos",
          ]),
          assist(
            "Busco una chaqueta más barata, pero que sea cómoda.",
            "I'm looking for a cheaper jacket that is comfortable.",
            [
              "I'm looking for comfortable shoes in a different size.",
              "This jacket is cheaper, but it is not comfortable.",
            ]
          ),
        ],
      },
      {
        title: "Home and neighbourhood",
        exercises: [
          select(
            "The sofa is in the living room: “El sofá está en ___.”",
            "el salón",
            ["la cocina", "el cuarto de baño"]
          ),
          assist(
            "Hay una farmacia delante del supermercado.",
            "There is a pharmacy in front of the supermarket.",
            [
              "The pharmacy is inside the supermarket.",
              "There are several supermarkets behind the pharmacy.",
            ]
          ),
        ],
      },
    ],
  },
  {
    title: "A1 · Décrire le monde",
    description:
      "Describe people, places, weather, preferences, and comparisons.",
    lessons: [
      {
        title: "Appearance and personality",
        exercises: [
          select(
            "Choose the opposite of “bajo” when describing height.",
            "alto",
            ["joven", "delgado"]
          ),
          assist(
            "Aunque parece seria, es muy amable y tiene mucho sentido del humor.",
            "Although she seems serious, she is very kind and has a great sense of humour.",
            [
              "She is serious and unfriendly, but she tells many jokes.",
              "Although he is kind, he seems rather nervous.",
            ]
          ),
        ],
      },
      {
        title: "Describing places",
        exercises: [
          select(
            "Complete: “El casco antiguo tiene calles ___ y edificios históricos.”",
            "estrechas",
            ["estrecho", "estrechamente"]
          ),
          assist(
            "El pueblo está rodeado de montañas y queda cerca de un lago.",
            "The village is surrounded by mountains and is close to a lake.",
            [
              "The village is on an island far from the mountains.",
              "The lake is surrounded by a village and a forest.",
            ]
          ),
        ],
      },
      {
        title: "Weather and seasons",
        exercises: [
          select("It's raining heavily: “___ mucho.”", "Llueve", [
            "Hace",
            "Está",
          ]),
          assist(
            "En otoño suele hacer fresco, aunque hoy hace bastante calor.",
            "In autumn it is usually cool, although today it is quite hot.",
            [
              "In spring it is usually hot, although today it is freezing.",
              "It is usually cool today because autumn is warm.",
            ]
          ),
        ],
      },
      {
        title: "Likes and gustar",
        exercises: [
          select(
            "Complete: “A mis amigos ___ las películas de ciencia ficción.”",
            "les gustan",
            ["les gusta", "los gustan"]
          ),
          assist(
            "A mi hermana le interesa la fotografía, pero no le gusta posar.",
            "My sister is interested in photography, but she doesn't like posing.",
            [
              "My sister is a photographer, but she dislikes taking pictures.",
              "My brother likes posing, but he is not interested in photography.",
            ]
          ),
        ],
      },
      {
        title: "Comparisons",
        exercises: [
          select("Complete: “Este tren es ___ rápido que el autobús.”", "más", [
            "muy",
            "mejor de",
          ]),
          assist(
            "El hotel es tan cómodo como el apartamento, pero está mejor situado.",
            "The hotel is as comfortable as the apartment, but it is better located.",
            [
              "The apartment is more comfortable and better located than the hotel.",
              "The hotel is less comfortable because it is far away.",
            ]
          ),
        ],
      },
    ],
  },
  {
    title: "A2 · Communication et voyages",
    description:
      "Travel independently, make plans, and navigate everyday situations.",
    lessons: [
      {
        title: "Asking for directions",
        exercises: [
          select(
            "Choose the polite question: “Could you tell me how to get to the museum?”",
            "¿Podría decirme cómo llegar al museo?",
            [
              "¿Podrías llevar el museo a la estación?",
              "¿Dónde podría comprar un museo?",
            ]
          ),
          assist(
            "Sigue recto hasta el semáforo y gira a la izquierda.",
            "Go straight on to the traffic lights and turn left.",
            [
              "Cross the street and turn right at the station.",
              "Go back to the traffic lights and wait on the left.",
            ]
          ),
        ],
      },
      {
        title: "Transport and travel",
        exercises: [
          select(
            "Complete: “El tren sale ___ las ocho y llega ___ Valencia.”",
            "a / a",
            ["en / de", "de / por"]
          ),
          assist(
            "Perdí el autobús, así que tuve que pedir un taxi.",
            "I missed the bus, so I had to call a taxi.",
            [
              "I took the bus because I had already booked a taxi.",
              "I lost my ticket and asked the driver for a taxi.",
            ]
          ),
        ],
      },
      {
        title: "Hotels and problems",
        exercises: [
          select(
            "Report a problem: “The air conditioning doesn't work.”",
            "No funciona el aire acondicionado.",
            ["No encuentro la recepción.", "El desayuno está incluido."]
          ),
          assist(
            "¿Sería posible cambiar a una habitación más tranquila?",
            "Would it be possible to change to a quieter room?",
            [
              "Could I make the room quieter by opening the window?",
              "Would you like to stay in this room for another week?",
            ]
          ),
        ],
      },
      {
        title: "Plans and invitations",
        exercises: [
          select(
            "Suggest a plan for tomorrow: “¿Te apetece ___ al cine?”",
            "ir",
            ["vas", "yendo"]
          ),
          assist(
            "Si no llueve, daremos un paseo por la playa después de comer.",
            "If it doesn't rain, we'll take a walk on the beach after lunch.",
            [
              "If it rained, we took a walk before lunch.",
              "We won't go to the beach because it is sunny.",
            ]
          ),
        ],
      },
      {
        title: "Hobbies and opinions",
        exercises: [
          select("Complete: “Llevo dos años ___ guitarra.”", "tocando la", [
            "tocar el",
            "toqué la",
          ]),
          assist(
            "Me parece que viajar en tren es más relajante que conducir.",
            "I think travelling by train is more relaxing than driving.",
            [
              "I prefer driving because the train is always relaxing.",
              "It seems that the train takes longer than the journey by car.",
            ]
          ),
        ],
      },
    ],
  },
  {
    title: "A2 · Passé, projets et phrases complexes",
    description:
      "Narrate past events and connect ideas with more precise grammar.",
    lessons: [
      {
        title: "Pretérito perfecto",
        exercises: [
          select(
            "Complete: “Esta semana ___ tres correos importantes.”",
            "he recibido",
            ["recibí", "recibía"]
          ),
          assist(
            "¿Has probado alguna vez la paella valenciana?",
            "Have you ever tried Valencian paella?",
            [
              "Did you try the paella in Valencia yesterday?",
              "Were you cooking paella when you visited Valencia?",
            ]
          ),
        ],
      },
      {
        title: "Pretérito indefinido",
        exercises: [
          select(
            "Complete: “El verano pasado ___ a Granada y ___ la Alhambra.”",
            "fui / visité",
            ["iba / visitaba", "he ido / he visitado"]
          ),
          assist(
            "Ayer llegamos tarde porque nuestro vuelo salió con retraso.",
            "Yesterday we arrived late because our flight departed late.",
            [
              "We usually arrive late because the flight is delayed.",
              "Tomorrow we will arrive late if our flight leaves early.",
            ]
          ),
        ],
      },
      {
        title: "Imperfecto for background and habits",
        exercises: [
          select("Complete: “Cuando era pequeño, ___ en un pueblo.”", "vivía", [
            "viví",
            "he vivido",
          ]),
          assist(
            "Hacía frío y la gente esperaba el autobús bajo la lluvia.",
            "It was cold and people were waiting for the bus in the rain.",
            [
              "It got cold after everyone had taken the bus.",
              "It is cold, so people will wait for the bus.",
            ]
          ),
        ],
      },
      {
        title: "Future plans and conditions",
        exercises: [
          select(
            "Complete: “Mañana ___ a mi abuela si termino pronto.”",
            "llamaré",
            ["llamaba", "llamé"]
          ),
          assist(
            "Si ahorramos lo suficiente, podremos hacer un viaje por Sudamérica.",
            "If we save enough, we will be able to take a trip around South America.",
            [
              "We saved enough because we travelled around South America.",
              "We would travel more if we had saved earlier.",
            ]
          ),
        ],
      },
      {
        title: "Pronouns and connecting ideas",
        exercises: [
          select(
            "Replace “el libro” with a direct object pronoun: “Voy a comprar ___.”",
            "lo",
            ["le", "se"]
          ),
          assist(
            "Aunque estaba cansada, terminó el informe y se lo envió a su jefe.",
            "Although she was tired, she finished the report and sent it to her boss.",
            [
              "Because she was tired, her boss finished and sent the report.",
              "She sent her boss a report before she started working.",
            ]
          ),
        ],
      },
    ],
  },
];

const imageSources = {
  man: "/man.svg",
  woman: "/woman.svg",
  boy: "/boy.svg",
  zombie: "/zombie.svg",
  robot: "/robot.svg",
  girl: "/girl.svg",
} as const;

const beginnerChallenges = [
  {
    type: "SELECT",
    target: "man",
    options: ["man", "woman", "boy"],
    answer: "man",
  },
  {
    type: "SELECT",
    target: "woman",
    options: ["woman", "boy", "man"],
    answer: "woman",
  },
  {
    type: "SELECT",
    target: "boy",
    options: ["woman", "man", "boy"],
    answer: "boy",
  },
  {
    type: "ASSIST",
    target: "man",
    options: ["woman", "man", "boy"],
    answer: "man",
  },
  {
    type: "SELECT",
    target: "zombie",
    options: ["man", "woman", "zombie"],
    answer: "zombie",
  },
  {
    type: "SELECT",
    target: "robot",
    options: ["robot", "zombie", "boy"],
    answer: "robot",
  },
  {
    type: "SELECT",
    target: "girl",
    options: ["girl", "zombie", "man"],
    answer: "girl",
  },
  {
    type: "ASSIST",
    target: "zombie",
    options: ["woman", "zombie", "boy"],
    answer: "zombie",
  },
] as const;

const beginnerCourses = [
  {
    title: "Spanish",
    imageSrc: "/es.svg",
    audioPrefix: "es",
    words: {
      man: "el hombre",
      woman: "la mujer",
      boy: "el chico",
      zombie: "el zombie",
      robot: "el robot",
      girl: "la niña",
    },
  },
  {
    title: "French",
    imageSrc: "/fr.svg",
    words: {
      man: "l'homme",
      woman: "la femme",
      boy: "le garçon",
      zombie: "le zombie",
      robot: "le robot",
      girl: "la fille",
    },
  },
] as const;

const seedBeginnerCourse = async (course: (typeof beginnerCourses)[number]) => {
  const [createdCourse] = await db
    .insert(schema.courses)
    .values({ title: course.title, imageSrc: course.imageSrc })
    .returning();

  const units = await db
    .insert(schema.units)
    .values([
      {
        courseId: createdCourse.id,
        title: "Unit 1",
        description: `Learn the basics of ${createdCourse.title}`,
        order: 1,
      },
      {
        courseId: createdCourse.id,
        title: "Unit 2",
        description: `Learn intermediate ${createdCourse.title}`,
        order: 2,
      },
    ])
    .returning();

  for (const unit of units) {
    const lessons = await db
      .insert(schema.lessons)
      .values([
        { unitId: unit.id, title: "Nouns", order: 1 },
        { unitId: unit.id, title: "Verbs", order: 2 },
        { unitId: unit.id, title: "Adjectives", order: 3 },
        { unitId: unit.id, title: "Phrases", order: 4 },
        { unitId: unit.id, title: "Sentences", order: 5 },
      ])
      .returning();

    for (const lesson of lessons) {
      const challenges = await db
        .insert(schema.challenges)
        .values(
          beginnerChallenges.map((challenge, index) => ({
            lessonId: lesson.id,
            type: challenge.type,
            question:
              challenge.type === "ASSIST"
                ? `"the ${challenge.target}"`
                : `Which one of these is "the ${challenge.target}"?`,
            order: index + 1,
          }))
        )
        .returning();

      for (const [index, challenge] of challenges.entries()) {
        const template = beginnerChallenges[index];
        await db.insert(schema.challengeOptions).values(
          template.options.map((word) => ({
            challengeId: challenge.id,
            correct: word === template.answer,
            text: course.words[word],
            ...(template.type === "SELECT"
              ? { imageSrc: imageSources[word] }
              : {}),
            ...("audioPrefix" in course
              ? { audioSrc: `/${course.audioPrefix}_${word}.mp3` }
              : {}),
          }))
        );
      }
    }
  }
};

const seedCurriculum = async (
  courseTitle: string,
  imageSrc: string,
  curriculum: {
    title: string;
    description: string;
    lessons: { title: string; exercises: Exercise[] }[];
  }[]
) => {
  let course = await db.query.courses.findFirst({
    where: eq(schema.courses.title, courseTitle),
  });

  if (!course) {
    [course] = await db
      .insert(schema.courses)
      .values({ title: courseTitle, imageSrc })
      .returning();
  }

  const currentUnits = await db.query.units.findMany({
    where: eq(schema.units.courseId, course.id),
    orderBy: (units, { asc }) => [asc(units.order)],
  });

  for (const [index, unit] of currentUnits.entries()) {
    if (!curriculum.some((module) => module.title === unit.title)) {
      await db
        .update(schema.units)
        .set({ order: 1000 + index })
        .where(eq(schema.units.id, unit.id));
    }
  }

  for (const [unitIndex, module] of curriculum.entries()) {
    let unit = currentUnits.find((current) => current.title === module.title);

    if (!unit) {
      [unit] = await db
        .insert(schema.units)
        .values({
          courseId: course.id,
          title: module.title,
          description: module.description,
          order: unitIndex + 1,
        })
        .returning();
    } else {
      await db
        .update(schema.units)
        .set({ order: unitIndex + 1, description: module.description })
        .where(eq(schema.units.id, unit.id));
    }

    const existingLessons = await db.query.lessons.findMany({
      where: eq(schema.lessons.unitId, unit.id),
    });

    for (const [lessonIndex, lessonContent] of module.lessons.entries()) {
      if (
        existingLessons.some((lesson) => lesson.title === lessonContent.title)
      ) {
        continue;
      }

      const [lesson] = await db
        .insert(schema.lessons)
        .values({
          unitId: unit.id,
          title: lessonContent.title,
          order: lessonIndex + 1,
        })
        .returning();

      for (const [
        exerciseIndex,
        exercise,
      ] of lessonContent.exercises.entries()) {
        const [challenge] = await db
          .insert(schema.challenges)
          .values({
            lessonId: lesson.id,
            type: exercise.type,
            question: exercise.question,
            order: exerciseIndex + 1,
          })
          .returning();

        await db.insert(schema.challengeOptions).values(
          exercise.options.map((option) => ({
            challengeId: challenge.id,
            text: option.text,
            correct: option.correct,
          }))
        );
      }
    }
  }
};

const main = async () => {
  try {
    console.log("Seeding database");

    for (const course of beginnerCourses) {
      const existingCourse = await db.query.courses.findFirst({
        where: eq(schema.courses.title, course.title),
      });

      if (!existingCourse) await seedBeginnerCourse(course);
    }

    await seedCurriculum("Spanish", "/es.svg", spanishCurriculum);
    await seedCurriculum("French", "/fr.svg", frenchCurriculum);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

void main();
