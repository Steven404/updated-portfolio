export interface Role {
  id: string;
  role: string;
  company: string;
  url: string;
  /** Short form for the timeline */
  period: string;
  /** Full dates for the role details */
  dates: string;
  location: string;
  current?: boolean;
  intro?: string;
  points: string[];
  stack: string[];
}

// Oldest first; the timeline reverses it on phones
export const EXPERIENCE: Role[] = [
  {
    id: 'flarmio',
    role: 'Full Stack Software Engineer',
    company: 'Flarmio',
    url: 'https://www.flarmio.com/',
    period: '2021 – 2023',
    dates: 'Oct 2021 – May 2023',
    location: 'Remote · Greece',
    intro:
      'I was part of an Agile team maintaining a web app with hundreds of users, and helped a second team build a mobile app.',
    points: [
      'Built new features and maintained existing code in React, React Native and TypeScript.',
      'Wrote automated end-to-end and integration tests with Cypress.',
      'Set up CI for those tests with GitHub Actions.',
      'Built back-end services with Express.js and MongoDB, exposed through GraphQL APIs.',
    ],
    stack: ['React', 'React Native', 'TypeScript', 'Cypress', 'GitHub Actions', 'Express.js', 'MongoDB', 'GraphQL'],
  },
  {
    id: 'valmore',
    role: 'Full Stack Software Engineer',
    company: 'Valmore Technologies',
    url: 'https://www.valmore.gr/',
    period: '2023',
    dates: 'May 2023 – Sep 2023',
    location: 'Remote · Greece',
    intro:
      'With a cross-functional team of developers and QA engineers, I worked on a high-traffic web platform serving thousands of daily active users.',
    points: [
      'Built responsive, accessible front-end components in HTML, CSS and JavaScript.',
      'Designed and implemented RESTful APIs in Express.js for new platform features.',
      'Wrote automated integration tests with Jest to keep the back-end services reliable.',
    ],
    stack: ['JavaScript', 'HTML & CSS', 'Express.js', 'Jest'],
  },
  {
    id: 'kdl',
    role: 'Full Stack Software Engineer',
    company: 'Kanellis Development Labs',
    url: 'https://kdevlabs.com/',
    period: '2023 – 2025',
    dates: 'Oct 2023 – Jun 2025',
    location: 'Remote · Greece',
    points: [
      'Built mobile apps in React Native and TypeScript, leaning on React hooks for state and lifecycle.',
      'Built and maintained a form-submission web app: Angular with NgRx on the front end, Express.js and PostgreSQL behind it for authentication and data storage.',
      'Hosted that app on an Ubuntu server with Docker containers, with Nginx handling port redirection.',
      'Developed an information-management web app in Angular on Firebase Firestore and Firebase Authentication, for real-time data and secure access control.',
    ],
    stack: ['React Native', 'TypeScript', 'Angular', 'NgRx', 'Express.js', 'PostgreSQL', 'Docker', 'Firebase'],
  },
  {
    id: 'base-element',
    role: 'Senior React Native Developer',
    company: 'Base Element',
    url: 'https://www.baseelement.digital/en/home',
    period: '2025 – now',
    dates: 'Jun 2025 – now',
    location: 'Remote · Nicosia, Cyprus',
    current: true,
    points: [
      'Upgraded large React Native apps with thousands of active users to the latest React Native versions and current Android and iOS SDKs, keeping them compatible and stable.',
      'Designed and built complex, high-impact features with smooth, performant animations and interactive UI components.',
      'Refactored legacy code and brought in modern libraries to make the apps faster and easier to maintain.',
      'Tracked down and fixed critical platform-specific issues on Android and iOS.',
      'Worked closely with product managers, designers and QA to ship new functionality without letting the experience slip.',
    ],
    stack: ['React Native', 'TypeScript', 'Android', 'iOS'],
  },
];
