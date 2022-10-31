import { hash } from 'bcryptjs';
import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../entities/User';

export default setSeederFactory(User, (faker) => {
    const user = new User();
    user.name = faker.name.firstName('male');
    user.email = faker.internet.email('male');
    user.password = faker.random.word();
    user.admin = true;
    return user;
})