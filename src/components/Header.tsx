import 'components/header.css';
import logo from 'assets/img/logo.svg';

const Header = () => {
    return (
        <header>
            <a href="/#/">
                <img src = {logo} alt = "Marvel"/></a>
        </header>
    );
};

export default Header;