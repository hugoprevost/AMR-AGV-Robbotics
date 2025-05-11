import React from 'react';
import './scroller.scss';
import scrollUp from '../../assets/img/mission/scroll-up.svg';
import scrollDown from '../../assets/img/mission/scroll-down.svg';




const Scroller = () => {

    let btn = document.getElementById('btn')
    let box = document.getElementById('box')

    class Scrollable extends React.Component{
        constructor (props) {
            super(props)

            this.scroll = this.scroll.bind(this)
            this.box = React.createRef()
        }

        scroll(){
            this.box.current.scrollBy({top:100, behavior:"smooth"})
        }
    }

    return (
        <>          
            <div className='scroller'> 
                <button onClick={this.scroll} className='scroller-block'>
                    <img src={ scrollUp } alt='Up button'/>
                </button> 
                <button className='scroller-block'>
                    <img src={ scrollDown } alt='Down button'/>
                </button>
            </div>
        </>
    )
}
  
export default Scroller;