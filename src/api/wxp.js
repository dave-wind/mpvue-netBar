/**
 * Created by dave on 2018/4/8.
 */
import wxp from 'minapp-api-promise'
import requestIntercept from '@/api/requestIntercept'
// 注册请求拦截器
wxp.intercept('request', requestIntercept)

export default wxp;
