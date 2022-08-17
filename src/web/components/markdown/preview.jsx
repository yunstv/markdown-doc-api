import React from 'react'
import { withRouter } from 'react-router-dom'
import { docFetchDataFunc } from 'root/utils/util'
// import Toc from './toc'
import './style'

const Hours = (_now) => {
  const now = _now || new Date()
  const hour = now.getHours() 
  let day
  const setDay = (d) => {
    day = d
  }
  if(hour < 6) setDay("凌晨")
  else if (hour < 9) setDay("早上")
  else if (hour < 12) setDay("上午")
  else if (hour < 14) setDay("中午")
  else if (hour < 17) setDay("下午")
  else if (hour < 19) setDay("傍晚")
  else if (hour < 22) setDay("晚上")
  else setDay("夜里")
  return day
}

var formatTime = function (tsp, form = 'Y-m-d H:i:s') {
	tsp = ('' + tsp)['length'] == 10 ? parseInt(tsp) * 1000 : parseInt(tsp)

	var ret = '', dict = {};
	var day = tsp ? new Date(tsp) : new Date();

	dict['Y'] = day.getFullYear();
	dict['y'] = parseInt(dict['Y'].toString().substring(2));
	dict['n'] = day.getMonth() + 1;
	dict['m'] = (day.getMonth() + 1 < 10 ? '0' + (day.getMonth() + 1) : day.getMonth() + 1);
	dict['d'] = day.getDate();
	dict['j'] = (day.getDate() < 10 ? '0' + (day.getDate()) : day.getDate());
	dict['H'] = (day.getHours() < 10 ? '0' + day.getHours() : day.getHours());
	dict['i'] = (day.getMinutes() < 10 ? '0' + day.getMinutes() : day.getMinutes());
	dict['s'] = (day.getSeconds() < 10 ? '0' + day.getSeconds() : day.getSeconds());
	dict['A'] = day.getHours() > 12 ? 'PM' : 'AM'
	dict['a'] = day.getHours() > 12 ? 'pm' : 'am'
  if (form === 'hours') {
    return Hours(day)
  }
  if (form === 'weekday') {
    var weekday = '天,一,二,三,四,五,六'.split(',').map((str) => '星期' + str)
    return weekday[day.getDay()]
  }

	if (form == 'auto') {
		form = formatTime(null, 'Y-m-d') == dict['Y'] + '-' + dict['m'] + '-' + dict['d'] ?
			'm-d A' : 'Y-m-d';
	}
	for (var i = 0; i < form.length; i++) {
		ret += (dict[form[i]] !== undefined) ? dict[form[i]] : form[i];
	}
	return ret
}

const PreView = (props) => {
  const { __html } = props
  if (!__html) {
    return null
  }
  React.useEffect(() => {
    window.hljs.highlightAll();
  }, [__html])
  return (
    <div className="markdown-wrapper"
      style={
        {
          width: '100%',
          zIndex: 1,
          overflowX: 'auto'
        }
      }
    >
      <div className="markdown github" dangerouslySetInnerHTML={{ __html }} ></div>
      {/* <Toc tocData={doctoc(__html)} handleTocClick={props.handleTocClick} /> */}
    </div>
  )
}

class PreViewComponent extends React.Component {
  handleTocClick(activeValue) {
    activeValue?.path && this.fetchData(activeValue.path)
  }
  scrollTo() {
    window.scrollTo({ 
      top: 0, 
      behavior: "smooth" 
    });
  }
  render() {
    const { info } = this.props
    const timeRow = info.mtimeMs !== info.birthtimeMs ? info.mtimeMs : info.birthtimeMs
    return (
     <div>
      <PreView
        __html={info.__html}
        handleTocClick={this.handleTocClick}
      />
      <div className='file-info'>
        文档更新时间：
        {
          `${formatTime(timeRow, 'Y-m-d H:i:s')} | ${formatTime(timeRow, 'weekday')} ${formatTime(timeRow, 'hours')}`
        }
      </div>
      <div className='page-up icon-chevron-up' onClick={this.scrollTo} />
     </div> 
    )
  }
}

const PreViewComponentHoc = withRouter((props) => {
  const [docInfo, setDocInfo] = React.useState({})
  const { match: { params } } = props
  const fetchData = React.useCallback((_path) => {
    docFetchDataFunc(
      {
        path: props.match.path,
        _path: _path
      },
      (value) => setDocInfo(value)
    )
  }, [params.path])
  React.useLayoutEffect(() => {
    fetchData(params.path)
  }, [props.match])
  return <PreViewComponent info={docInfo}/>
})

export default PreViewComponentHoc