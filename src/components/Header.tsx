import logo from 'assets/img/logo.svg';
import { HeaderStyles } from 'components/styled-components/header';
const Header = () => {
    return (
        <>
        <HeaderStyles/>
        <header>
            <a href="/#/">
                <img src = {logo} alt = "Marvel"/></a>
        </header>
        </>
    );
};

export default Header;