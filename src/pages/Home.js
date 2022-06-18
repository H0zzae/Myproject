import React, {useEffect, useRef, useState} from "react";
import * as style from './styles';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import data from '../data.json';
import Modal from '@mui/material/Modal';

function Home(){
    const [proj, setProj] = useState(data); //필터링 된 프로젝트가 들어갈 변수
    const [lang, setLang] = useState([]); //모든 프로젝트에 사용된 언어들을 모아두는 변수
    const [filter, setFilter] = useState([]); //사용자가 선택하는 필터값
    const [detail, setDetail] = useState({title : "",date:"",language:[],description:"",url :"", github:""}); //사용자가 더보기를 누른 데이터
    const [modal, setModal] = useState(false); //모달 창의 오픈or클로즈 여부 ture: 모달 창 open , false : 모달 창 close

    //페이지 처음 로드시 실행됨
    useEffect(() => {
        countLang();
    },[])

    //필터의 값이 변경될 때 마다 실행됨
    useEffect(() => {
        FilteredFunction();
    },[filter])

    //모든 프로젝트에 사용된 언어들을 count
    const countLang = () => {
        let language = new Set();
       data.map((d) => {
           d["language"].map((elem) => language.add(elem))
       })
        setLang([...language])
    }

    //필터 값을 설정하는 함수
    const selected = ({target}) => {
        let l = target.value
        let newArray = new Set(filter);
        if (newArray.has(l)){
            newArray.delete(l)
        }else {
            newArray.add(l)
        }
        setFilter([...newArray])
    }

    //필터가 설정되면, 해당 설정된 값에 해당하는 프로젝트를 반환함
    const FilteredFunction = () =>{
        let filteredData = new Set();
        if (filter.length>0) {
            data.map((p) => {
                p["language"].map((l) => {
                    if (filter.includes(l)) {
                        filteredData = filteredData.add(p)
                        return false
                    }
                })
            })
            setProj([...filteredData]);
        }
        else {
            setProj(data);
        }
    }

    //프로젝트의 상세 정보 보기를 클릭시 실행되는 함수
    const showMore = ({target}) => {
        setDetail(data[target.value-1]);
        controlModal();
    }

    //Modal이 열리는 지 아닌지의 값을 관리함
    const controlModal = () => {
        setModal(!modal);
    }

    //페이지 구성
    return(
        <div>
            <style.Header>
                <Typography variant="h3" style={{color:"#ffffff"}}>H0zzae's Project</Typography>
            </style.Header>
            <Typography variant="h5">PROJECT LIST</Typography>
            <style.Filter>
                <Typography variant="subtitle1">Language</Typography>
                <style.languageGroup>
                    {lang.map((l) => (
                        <style.filterBtn size="small" variant={filter.includes(l)? 'contained' : "text"} onClick={selected} value={l}>{l}</style.filterBtn>
                    ))}
                </style.languageGroup>
            </style.Filter>
            <style.ProjectList>
                <Modal
                    open={modal}
                    onClose={controlModal}
                    aria-labelledby="modal-modal-title"
                >
                    <style.modalContent>
                    <Typography variant="h5">{detail.title}</Typography>
                    <Typography sx={{ fontSize: 14 }} style={{textAlign:"right"}} color="text.secondary" gutterBottom>{detail.date}</Typography>
                        <ButtonGroup variant="text" style={{flexWrap:'wrap', justifyContent:'center', margin: "10px 0"}}>
                            {detail["language"].map((lang) => (
                                <Button size="small">{lang}</Button>
                            ))}
                        </ButtonGroup>
                    <Typography style={{textAlign:"left", margin:"10px 0"}}>{detail.description}</Typography>
                    {detail.url!=="" ? <Button href={detail.url}>Link</Button> : null}
                    <Button href={detail.github}>GITHUB</Button>
                    </style.modalContent>
                </Modal>
                {proj.map((p) => (
                    <style.ProjectCard variant="outlined">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {p["date"]}
                            </Typography>
                            <Typography ccomponent="div">
                                {p["title"]}
                            </Typography>
                            <ButtonGroup variant="text" style={{flexWrap:'wrap', justifyContent:'center'}}>
                                {p["language"].map((lang) => (
                                    <Button size="small" onClick={selected} value={lang}>{lang}</Button>
                                ))}
                            </ButtonGroup>
                            <Typography variant="body2" style={{margin:'10px 0'}}>
                                {p["summary"]}
                            </Typography>
                        </CardContent>
                        <CardActions style={{justifyContent:'flex-end'}}>
                            <Button size="small" value={p["id"]} onClick={showMore}>Show More</Button>
                        </CardActions>
                    </style.ProjectCard>
                ))}
            </style.ProjectList>
        </div>
    )
}
export default Home;