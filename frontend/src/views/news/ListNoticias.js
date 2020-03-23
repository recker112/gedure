//React
import React, { useEffect } from 'react';

//Componentes
import { ImagenVisor } from '../../components/ImagenVisor';

//Redux
import { connect } from 'react-redux';
import { updateNewsNoticias } from '../../actions/news/updateNews';

//Material-UI
import { Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export function ListNoticias({ list, updateNewsNoticias }) {
    useEffect(
        () => {
            const fetchData = async () => {
                try {
                    const res = await axios.get('api/news');

                    if (res.status !== 200) {
                        throw "server_error";
                    }

                    updateNewsNoticias(res.data);
                } catch (error) {
                    console.log(error);
                }
            };

            let cancel = false;
            if (!cancel) {
                fetchData();
            }

            //Al desmontar
            return () => {
                cancel = true;
                updateNewsNoticias(null);
            };
        },
        [updateNewsNoticias]
    );

    return (
        <article className="BoxNoticias">
            {list !== null ? <Noticia options={list} /> : <SkeletonNoticia />}
        </article>
    );
}

export function SkeletonNoticia() {
    return (
        <Paper variant="outlined">
            <section className="Noticia">
                <div className="NHead">
                    <Skeleton variant="circle" className="NHeadImg" />
                    <Skeleton variant="text" className="NHeadName" width={150} />
                </div>
                <hr />
                <div className="NContent">
                    <Skeleton variant="text" className="NContentTitle" width={200} />
                    <p className="NContentP">
                        <Skeleton variant="text" width="100%" />
                        <Skeleton variant="text" width="100%" />
                        <Skeleton variant="text" width="100%" />
                        <Skeleton variant="text" width="100%" />
                    </p>
                </div>
                <ImagenVisor options="loading" />
            </section>
        </Paper>
    );
}

export function Noticia(props) {
    const recorrerList = props.options.map(news => {
        let name;
        let avatar;
        if (news.privilegio === "A-") {
            name = news.nameA;
            avatar = news.avatarA;
        } else {
            name = news.nameC;
            avatar = news.avatarC;
        }
        return (
            <div key={news.id}>
                <Paper variant="outlined">
                    <section className="Noticia">
                        <div className="NHead">
                            <span className="NHeadImg">Logo</span>
                            <span className="NHeadName">{name}</span>
                        </div>
                        <hr />
                        <div className="NContent">
                            <span className="NContentTitle">{news.title}</span>
                            <p className="NContentP">{news.content}</p>
                        </div>
                        <ImagenVisor options={JSON.parse(news.imgList)} />
                    </section>
                </Paper>
            </div>
        )
    }
    );

    return recorrerList;
}

const mapStateToProps = state => ({
    list: state.news.dataN
});

const mapDispatchToProps = {
    updateNewsNoticias
};

export default connect(mapStateToProps, mapDispatchToProps)(ListNoticias);
