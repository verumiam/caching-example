import {useCallback, useMemo, useState} from "react";
import {User} from "../entities/user/types/UserTypes";
import {UserInfo} from "../entities";
import {Button, useThrottle} from "../shared";

const URL = 'https://jsonplaceholder.typicode.com/users'

function App(): JSX.Element {
    const [item, setItem] = useState<User | null>(null);
    const cachedUser = useMemo(() => new Map<number, User>(), []);

    const receiveRandomUser = useCallback(async () => {
        const id = Math.floor(Math.random() * (10 - 1)) + 1;

        if (cachedUser.has(id)) {
            setItem(cachedUser.get(id)!);
            return;
        }

        const response = await fetch(`${URL}/${id}`);
        if (!response.ok) {
            console.error('Failed to fetch user.');
            return;
        }
        const user = (await response.json()) as User;
        cachedUser.set(id, user);
        setItem(user);
    }, [cachedUser]);

    const handleButtonClick = useThrottle(
        useCallback(
            (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                event.stopPropagation();
                receiveRandomUser();
            },
            [receiveRandomUser]
        ),
        1000
    );

    return (
        <div>
            <header>Get a random user</header>
            <Button onClick={handleButtonClick} />
            <UserInfo user={item} />
        </div>
    );
}

export default App;