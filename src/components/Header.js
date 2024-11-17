import {PropTypes} from 'prop-types'
import {Button} from './Button'
import { useLocation } from 'react-router-dom'

//rafce component
const Header = ({title, onAdd, showAddTask}) => {
    const location = useLocation()
    return (
        <header className='header'>
            <h1>{title}</h1>
            
            {location.pathname === '/' && <Button color={showAddTask ? "orange" : "green"} text={showAddTask ? "Close" : "Add"} onClick={onAdd}/>}
        </header>
    )
}

//catch errors without typescript
Header.defaultProps = {
    title: 'ToDo',
}
Header.propTypes = {
    title: PropTypes.string,
}

// const headingStyle = {
//     color: 'white', backgroundColor: 'black'
// }

export default Header
