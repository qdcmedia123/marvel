import { Model } from 'components/styled-components'

interface ComicModelProps {
    containerHeigh: number;
    refP: any;
    currentComic: any;
}

const ComicModel = ({ containerHeigh, refP, currentComic }: ComicModelProps) => {
    return (<Model height={containerHeigh}>
        <div className="popup-wrapper" ref={refP}>
            <div className="popup-title">{currentComic.title}</div>
            <div className="col-wrapper">
                <div className="col">
                    <img src={`${currentComic.thumbnail.path}/portrait_uncanny.${currentComic.thumbnail.extension}`}
                        alt="" />
                </div>
                <div className="col">
                    <div className="col-text">
                        {currentComic.description}
                    </div>
                </div>
            </div>

        </div>
    </Model>);
};



export default ComicModel;