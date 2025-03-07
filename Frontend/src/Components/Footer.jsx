import "../styles/Footer.css";
import search_img_blue from "../img/find_blue.png";
import history_img from "../img/history.png";
import profile_img from "../img/profile.png";
import settings_img from "../img/settings.png";

export default function Footer () {
    return (
        <footer>
            <div className="container page_wrap">
                <div className="page active_page">
                    <img src={search_img_blue} alt="" height={30} />
                    <p>Поиск</p>
                </div>
                <div className="page">
                    <img src={history_img} alt="" height={30} />
                    <p>История</p>
                </div>
                <div className="page">
                    <img src={profile_img} alt="" height={30}/>
                    <p>Профиль</p>
                </div>
                <div className="page">
                    <img src={settings_img} alt="" height={30}/>
                    <p>Настройки</p>
                </div>
                </div>
        </footer>
    )
}