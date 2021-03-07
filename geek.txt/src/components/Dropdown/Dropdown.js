import classes from './Dropdown.module.css';
import {useState, useRef, useEffect} from 'react';


const Dropdown = ({prompt, value, onChange,width, options}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        document.addEventListener('click', close);
        return () => document.removeEventListener('click', close);
    }, [])

    const close = (e) => { 
        // Find a way to eliminate ongoing calls 
        setOpen(e && e.target === ref.current);
    }

  
    return (
        <div className={classes.dropdown} style={{width}} >
            <div className={classes.control} onClick={() => setOpen(prev => !prev)}>
                <div className={classes.selected_value} ref={ref}>{prompt}</div>
                <div className={ `${classes.arrow} ${open ? classes.open : ""}`}></div>
            </div>
            <div className={`${classes.options} ${open ? classes.open : ""}`}>
                {
                    options.map(option => (
                    <div className={`${classes.option} ${value === option.name ? classes.selected : ""}`} 
                    key={option.id} 
                    onClick={() => {
                        onChange(option.name);
                        setOpen(false)
                    }}
                    >
                        {option.name}
                    </div>)
                    )
                }
            </div>
        </div>
    )
}

export default Dropdown;