import React, { useCallback, useState } from 'react';
import {
  ref, onValue, DataSnapshot, query, equalTo, orderByChild, push,
} from 'firebase/database';

import './App.css';
import { db } from './firebase';

function App() {
  const [data, setdata] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [phoneParam, setphoneParam] = useState(0);
  const [errMsg, seterrMsg] = useState('');

  const handleErr = useCallback((msg: string) => {
    seterrMsg(msg);
  }, [errMsg]);

  const handleSearch = useCallback(async () => {
    if (!phoneParam) {
      handleErr('您尚未输入信息');
      return;
    }
    const dataRef = ref(db, '/data');
    setisLoading(true);
    onValue(query(dataRef, orderByChild('phone'), equalTo(phoneParam)), (snapshot: DataSnapshot) => {
      setisLoading(false);
      setdata(snapshot.val());
      if (!snapshot.val()) {
        handleErr('无法找到该手机号对应的信息，请核对输入信息，如有疑问请联系购买渠道客服。');
      }
    }, {
      onlyOnce: true,
    });
  }, [phoneParam]);

  return (
    <div className="App">
      {errMsg && (
      <div className="error-message alert alert-danger" role="alert">
        {errMsg}
      </div>
      )}
      <div className="header">聚众优选单号自助查询系统</div>
      <div className="input-label">请输入您的手机号进行查询</div>
      <input type="search" onChange={(e: any) => setphoneParam(e.target.value)} />

      <button className="btn btn-primary" type="submit" onClick={handleSearch} disabled={isLoading}>查询</button>

      {data && Boolean(Object.keys(data)?.length) && Object.values(data).map((d: any) => (
        <div className="data-display">
          <div className="data-cell">
            <div className="label">姓名</div>
            <div className="name">{d?.name}</div>
          </div>
          <div className="data-cell">
            <div className="label">手机号</div>
            <div className="phone">{d?.phone}</div>
          </div>
          <div className="data-cell">
            <div className="label">产品名称</div>
            <div className="product">{d?.product}</div>
          </div>
          <div className="data-cell">
            <div className="label">产品数量</div>
            <div className="product">{d?.productCount}</div>
          </div>
          <div className="data-cell">
            <div className="label">快递公司</div>
            <div className="deliveryCompany">{d?.deliveryCompany}</div>
          </div>
          <div className="data-cell">
            <div className="label">快递单号</div>
            <div className="deliveryId">{d?.deliveryId}</div>
          </div>
          <div className="data-cell">
            <div className="label">购买渠道</div>
            <div className="channel">{d?.channel}</div>
          </div>
          <div className="data-cell">
            <div className="label">渠道联系方式</div>
            <div className="channelContact">{d?.channelContact}</div>
          </div>
        </div>
      ))}

    </div>
  );
}

export default App;
