import { useState, useEffect } from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App = () => {

    const [searchField, setSearchField] = useState(''); // [value, setValue]
    const [monsters, setMonsters] = useState([]);
    const [filteredMonsters , setFilteredMonster] = useState(monsters)
    const [stringField, setStringField] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((users) => setMonsters(users)
            )
    }, []);

    useEffect(() => {
        const newFilteredMonsters = monsters.filter((monster) => {
            return monster.name.toLocaleLowerCase().includes(searchField);
        });
        setFilteredMonster(newFilteredMonsters);
    }, [monsters, searchField]);

    const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLocaleLowerCase();
        setSearchField(searchFieldString)
    }

    return (
        <div className="App" >
            <h1 className='app-title'>Monster Rolodex</h1>

            <SearchBox onChangeHandler={onSearchChange} placeholder='Search monsters' className='monsters-search-box' />
            {<CardList monsters={filteredMonsters} />}
        </div>
    )
}

/* class App extends Component {
    constructor() {
        super();

        this.state = {
            monsters: [],
            searchField: ''
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((users) =>
                this.setState(
                    () => {
                        return { monsters: users };
                    }
                )
            )
    }

    onSearchChange = (event) => {

        const searchField = event.target.value.toLocaleLowerCase();

        this.setState(() => {
            return { searchField };
        })
    }

    render() {
        console.log('render');

        const { monsters, searchField } = this.state;
        const { onSearchChange } = this;

        const filteredMonsters = monsters.filter((monster) => {
            return monster.name.toLocaleLowerCase().includes(searchField);
        });

        return (

        );
    }
} */
export default App;