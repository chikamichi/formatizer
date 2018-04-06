/* eslint-disable no-console */

/*
 * Package Import
 */

/*
 * Local Import
 */

/*
 * Fake Users
 */
const users = [
  { id: 0, mention: 'question' },
  { id: 1, mention: 'test_mention_me', role: 'teacher' },
  { id: 2, mention: 'Céline', role: 'student' },
  { id: 3, mention: "hanto-art'soa", role: 'student' },
  { id: 4, mention: 'Loic S', role: 'student' },
];

/*
 * Example `isMention`
 */
export const isMention = (mention) => {
  const userExists = users.find(user => mention === user.mention);

  if (userExists) {
    return mention === userExists.mention;
  }

  return false;
};

/*
 * Example `isMentionMe`
 */
export const isMentionMe = mention =>
  mention === 'test_mention_me' || mention === 'question';

/*
 * Example `onMention`
 */
export const onMention = mention =>
  console.log(`Hey, ${mention} has been mentioned in the chat! :)`);

/*
 * Example `onMentionMe`
 */
export const onMentionMe = mention =>
  console.log(
    `Hey, I have been mentioned in the chat, I succeeded ${mention}! :)`,
  );
