import movieData from "movieData";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MovieView from "Components/MovieView";
import { CircularProgress } from "@material-ui/core";
import { dbzaraApi } from "dbzaraApi";

const Filmography = ({ match }) => {
    const [filmography, setFilmography] = useState();

    const getFilmography = async () => {
        const { data: filmography } = await dbzaraApi.actor(match.params.id);
        setFilmography(() => filmography);
    }

    useEffect(() => {
        getFilmography();
    }, [])


    return (
        filmography ? (
            <>
                <Container>
                    <HeadArea>
                        <BgBlurArea />
                        <TopText>
                            <TopTit>{filmography.name}</TopTit>
                            <TopStit>1978.09.14</TopStit>
                            <Photo>
                                <PhotoImg src={filmography.image} />
                            </Photo>
                        </TopText>
                    </HeadArea>
                    <MovieCont>
                        <DetailCont>
                            <FilmoTit>필모그래피</FilmoTit>
                            <FilmoList>
                                {filmography.filmography.map(movie => {
                                    return (
                                        <MovieView
                                            isFilmo={true}
                                            id={movie.id}
                                            src={movie.poster}
                                            age={movie.grade}
                                            title={movie.name}
                                        />
                                    );
                                })}
                            </FilmoList>
                        </DetailCont>
                    </MovieCont>
                </Container>
            </>
        ) : (
            <>
                <LoadingArea>
                    <CircularProgress />
                </LoadingArea>
            </>
        )
    )
};

export default Filmography;

const Container = styled.div`
    padding-top: 70px;
    min-width: 1200px;
    background: #f5f5f5;
    overflow: hidden;
`;

const HeadArea = styled.div`
    position: relative;
    height: 182px;
    background: #000;
`;

const MovieCont = styled.div`
    padding-bottom: 120px;
    margin: auto;
    width: 1200px;
`;

const BgBlurArea = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    width: 1900px;
    height: 182px;
    transform: translate(-50%, 0);
    overflow: hidden;
    z-index: 1;
    :after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.5);
        -webkit-filter: blur(1px);
        z-index: 2;
    }
`;

const TopText = styled.div`
    position: relative;
    top: 55px;
    z-index: 5;
    font-size: 32px;
    color: #fff;
    text-align: center;
    margin: auto;
    width: 1200px;
`;

const TopTit = styled.p`
    font-size: 28px;
    color: #fff;
    text-align: center;
`;

const TopStit = styled.p`
    padding-top: 10px;
    font-size: 13px;
    opacity: .7;
    color: #fff;
    text-align: center;
`;

const Photo = styled.div`
    position: absolute;
    top: 70px;
    left: 50%;
    width: 120px;
    height: 120px;
    overflow: hidden;
    border-radius: 50%;
    z-index: 5;
    transform: translate(-50%, 0);
    text-align: center;
    background: #e5e5e5;
    border: 0px solid #e5e5e5;
`;

const PhotoImg = styled.img`
    width: 100%;
    text-align: center;
`;

const DetailCont = styled.div`
    padding-top: 120px;
`;

const FilmoTit = styled.p`
    padding-bottom: 20px;
    margin-top: 0;
    position: relative;
    margin: 80px 0 20px;
    font-size: 20px;
    color: #2b2b2b;
`;

const FilmoList = styled.div`
    display: grid;
    grid-template-columns: 275.5px 275.5px 275.5px 275.5px;
    gap: 50px 30px;
`;

const LoadingArea = styled.div`
  margin: 400px auto 300px;
  width: 1200px;
  text-align: center;
`;