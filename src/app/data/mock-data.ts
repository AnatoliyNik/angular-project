import { Course } from '@models/course.model';

export const courses: Course[] = [
  {
    id: '1',
    creationDate: new Date(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
      'Accusantium aspernatur deleniti error hic nostrum quod quos sequi totam ' +
      'ut voluptates! A aliquid blanditiis consectetur dolor doloribus ducimus ',
    duration: 100,
    title: 'New video course about Angular',
    topRated: true,
    authors: [{id: 'test id', name: 'test name'}]
  },
  {
    id: '2',
    creationDate: new Date(2024, 0, 13),
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
      'Accusantium aspernatur deleniti error hic nostrum quod quos sequi totam ' +
      'ut voluptates! A aliquid blanditiis consectetur dolor doloribus ducimus ' +
      'est fuga neque odio odit omnis, optio perspiciatis placeat porro quam quis ' +
      'repellendus ut velit vero, voluptatem. Alias consequuntur, cupiditate dolores ' +
      'illo minima omnis possimus quod vero. Debitis dicta dignissimos doloribus ea, ' +
      'fugiat ipsam iste labore molestiae molestias necessitatibus neque nulla perspiciatis ' +
      'porro provident saepe suscipit tenetur vero voluptate voluptatem voluptates! ' +
      'Consequatur cumque deleniti, eligendi eos, eum exercitationem ipsa ipsam laborum ' +
      'mollitia quibusdam quidem quod reiciendis repellat, repellendus rerum saepe soluta ' +
      'tempore? Neque!',
    duration: 120,
    title: 'New video course about Angular',
    topRated: false,
    authors: [{id: 'test id', name: 'test name'}]
  },
  {
    id: '3',
    creationDate: new Date(2024, 10, 4),
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
      'Accusantium aspernatur deleniti error hic nostrum quod quos sequi totam ' +
      'ut voluptates! A aliquid blanditiis consectetur dolor doloribus ducimus ' +
      'est fuga neque odio odit omnis, optio perspiciatis placeat porro quam quis ' +
      'repellendus ut velit vero, voluptatem. Alias consequuntur, cupiditate dolores ' +
      'illo minima omnis possimus quod vero. Debitis dicta dignissimos doloribus ea, ' +
      'fugiat ipsam iste labore molestiae molestias necessitatibus neque nulla perspiciatis ' +
      'porro provident saepe suscipit tenetur vero voluptate voluptatem voluptates! ' +
      'Consequatur cumque deleniti, eligendi eos, eum exercitationem ipsa ipsam laborum ' +
      'mollitia quibusdam quidem quod reiciendis repellat, repellendus rerum saepe soluta ' +
      'tempore? Neque!',
    duration: 59,
    title: 'New video course about Angular',
    topRated: true,
    authors: [{id: 'test id', name: 'test name'}]
  }
]
