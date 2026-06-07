import { portfolioData } from '../portfolioData.js';

const normalizeQuery = (value) => value.toLowerCase().replace(/[^a-z0-9+\s]/g, ' ');

const hasAny = (query, terms) => terms.some((term) => query.includes(term));

const formatProject = (project) => `${project.title}: ${project.description} Stack: ${project.tech.join(', ')}.`;

export const createLocalAnswer = (rawQuestion) => {
  const query = normalizeQuery(rawQuestion);
  const { personal, experience, projects, skills, education, linkedinHighlights } = portfolioData;

  if (!query.trim()) {
    return [
      'Ask me something about Jeevan: experience, Google, AI work, projects, education, coursework, skills, or organizations.',
      'Example: ask what AI experience does Jeevan have?'
    ];
  }

  if (hasAny(query, ['google', 'current', 'now', 'present', 'photos', 'android'])) {
    const google = experience.find((item) => item.company.includes('Google'));
    return [
      `${google.role} at ${google.company}, ${google.period}.`,
      ...google.highlights
    ];
  }

  if (hasAny(query, ['ai', 'artificial intelligence', 'llm', 'machine learning', 'ml', 'agent', 'transformer'])) {
    const anvian = experience.find((item) => item.role.includes('Artificial Intelligence'));
    const legacy = projects.find((item) => item.id === 'legacy-translator');
    return [
      `${anvian.role} at ${anvian.company}: ${anvian.highlights[0]}`,
      `Project work: ${formatProject(legacy)}`,
      'Related tools include Python, Transformers, PyTorch, LLMs, and AI integration in Android development.'
    ];
  }

  if (hasAny(query, ['experience', 'internship', 'work', 'job', 'timeline'])) {
    return [
      'Jeevan experience timeline:',
      ...experience.map((item) => `- ${item.period}: ${item.role} at ${item.company}`)
    ];
  }

  if (hasAny(query, ['teach', 'teaching', 'ta', 'mentor', 'cs 544', 'big data'])) {
    const teachingRoles = experience.filter((item) => item.role.toLowerCase().includes('teaching') || item.role.toLowerCase().includes('assistant'));
    return [
      'Teaching and mentoring work:',
      ...teachingRoles.map((item) => `- ${item.role} at ${item.company}: ${item.highlights[0]}`)
    ];
  }

  const projectMatch = projects.find((project) => query.includes(project.title.toLowerCase()) || query.includes(project.id.replaceAll('-', ' ')));
  if (projectMatch) {
    return [
      formatProject(projectMatch),
      projectMatch.longDescription,
      projectMatch.restricted ? projectMatch.restrictionReason : `Source: ${projectMatch.sourceUrl}`
    ];
  }

  if (hasAny(query, ['project', 'portfolio', 'github', 'built', 'build'])) {
    return [
      'Featured projects:',
      ...projects.map(formatProject)
    ];
  }

  if (hasAny(query, ['skill', 'stack', 'tech', 'language', 'framework', 'tools'])) {
    return [
      `${skills.chip}: ${skills.description}`,
      ...skills.categories.map((category) => `${category.title}: ${category.specs.map((spec) => spec.name).join('; ')}`)
    ];
  }

  if (hasAny(query, ['education', 'school', 'college', 'university', 'uw', 'madison', 'berkeley', 'degree', 'gpa'])) {
    return [
      'Education:',
      ...education.map((item) => `- ${item.school}: ${item.degree}, ${item.period}${item.gpa ? `, GPA ${item.gpa}` : ''}.`)
    ];
  }

  if (hasAny(query, ['course', 'coursework', 'class', 'classes'])) {
    return [
      'Coursework:',
      ...linkedinHighlights.courses.map((course) => `- ${course.code}: ${course.title}`)
    ];
  }

  if (hasAny(query, ['organization', 'club', 'campus', 'group', 'groups'])) {
    return [
      'Organizations:',
      ...linkedinHighlights.organizations.map((organization) => `- ${organization}`)
    ];
  }

  if (hasAny(query, ['contact', 'email', 'linkedin', 'connect'])) {
    return [
      `Email: ${personal.socials.email.replace('mailto:', '')}`,
      `LinkedIn: ${personal.socials.linkedin}`,
      `GitHub: ${personal.socials.github}`
    ];
  }

  if (hasAny(query, ['about jeevan', 'who is jeevan', 'jeevan', 'intro', 'summary', 'yourself'])) {
    return [
      `${personal.name} is a ${personal.title}.`,
      personal.subSlogan
    ];
  }

  return [
    'I can only answer questions about Jeevan Jyot Singh, his experience, projects, education, coursework, skills, and campus work.',
    'Try: ask what has Jeevan done with AI?'
  ];
};
