import Group from '../models/group';

const GROUPS = [
  new Group(
    'g1',
    '2020-04-03',
    'Egnahemsfabriken',
    'Karin Hansson',
    '0702415623',
    'karin.hansson@gmail.com',
    'Näs 22',
    '47176',
    'ny'
  ),
  new Group(
    'g2',
    '2020-04-07',
    'Svenska Kyrkan Tjörn',
    'Bob Knutsson',
    '0724662262',
    'bob.knutsson@gmail.com',
    'Näs 22',
    '47176',
    'ny'
  ),
  new Group(
    'g3',
    '2020-04-02',
    'Svenska Kyrkan Mjörn',
    'Lars Ullerud',
    '0724662262',
    'bob.knutsson@gmail.com',
    'Näs 22',
    '47174',
    'aktiv'
  ),
  new Group(
    'g4',
    '2020-04-01',
    'Kalles grupp',
    'Kalle Karlsson',
    '0701245662',
    'kalle.karlsson@gmail.com',
    'Näs 22',
    '47174',
    'inaktiv'
  )
];

export default GROUPS;
