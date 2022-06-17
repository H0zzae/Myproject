import React, {useEffect, useRef, useState} from "react";
import * as style from './styles';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import data from '../data.json';
function Home(){
    const [proj, setProj] = useState(data);
    const [lang, setLang] = useState([]);
    const [filter, setFilter] = useState([]);
    useEffect(() => {
        countLang();
    },[])
    useEffect(() => {
        FilteredFunction();
    },[filter])
    const countLang = () => {
        let language = new Set();
       data.map((d) => {
           d["language"].map((elem) => language.add(elem))
       })
        setLang([...language])
    }
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
                {proj.map((p) => (
                    <style.ProjectCard variant="outlined">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {p["date"]}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {p["title"]}
                            </Typography>
                            <ButtonGroup variant="text" style={{flexWrap:'wrap', justifyContent:'center'}}>
                                {p["language"].map((lang) => (
                                    <Button size="small">{lang}</Button>
                                ))}
                            </ButtonGroup>
                            <Typography variant="body2" style={{margin:'10px 0'}}>
                                {p["summary"]}
                            </Typography>
                        </CardContent>
                        <CardActions style={{justifyContent:'flex-end'}}>
                            <Button size="small">Show More</Button>
                        </CardActions>
                    </style.ProjectCard>
                ))}
            </style.ProjectList>
        </div>
    )
}
export default Home;