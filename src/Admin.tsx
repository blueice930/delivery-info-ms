/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useState, CSSProperties, useEffect, useCallback, useRef,
} from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
import { parse } from 'papaparse';
// import { push, ref } from 'firebase/database';

import './Admin.css';
import { auth, db } from './firebase';

function Admin() {
  const [email, setEmail] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [file, setfile] = useState(null);
  const [entries, setEntries] = useState([]);
  const [errMsg, seterrMsg] = useState('');
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const [successMsg, setsuccessMsg] = useState('');
  const [pw, setpw] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const login = async () => {
    if (!(email && pw)) {
      seterrMsg('请输入邮箱和密码');
      return;
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pw }),
    };
    const url = window.location.hostname === 'localhost' ? 'http://localhost:8080/auth' : 'https://db-query-backend-3tb7lob5jq-df.a.run.app/auth';
    const response = await fetch(url, requestOptions);
    const { success, data } = await response.json();

    if (success) {
      setsuccessMsg('登录成功!');
      setisLoggedIn(true);
      setSessionId(data?.sessionId);
    } else {
      seterrMsg('登录失败!');
    }
  };

  const upload = useCallback(async () => {
    if (!entries || !entries.length) {
      seterrMsg('未检测到有效数据');
      return;
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, sessionId, entries }),
    };
    const url = window.location.hostname === 'localhost' ? 'http://localhost:8080/insert' : 'https://db-query-backend-3tb7lob5jq-df.a.run.app/insert';

    try {
      const response = await fetch(url, requestOptions);
      const { success, data } = await response.json();
      if (success) {
        setsuccessMsg('上传成功!');
        console.log('data', data);
      } else {
        seterrMsg(`上传失败! 错误: ${data}`);
      }
    } catch (e) {
      seterrMsg('上传失败! 请检查文件');
      console.error('e', e);
    }

    // realtime db abandoned in this project.
    // const dataRef = ref(db, '/data');
    // try {
    //   // eslint-disable-next-line no-restricted-syntax
    //   for (const d of data) {
    //     push(dataRef, d);
    //     console.log('d', d);
    //   }
    // } catch (e) {
    //   seterrMsg('上传失败! 请检查文件');
    //   console.error('e', e);
    // }

    setEntries([]);
    setfile(null);
    fileRef.current!.value = '';
  }, [entries]);

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      login();
    }
  };

  useEffect(() => {
    if (file) {
      parse(file, {
        complete(results: any) {
          if (results?.data) {
            setEntries(results?.data);
            return;
          }
          if (results?.errors?.length) {
            seterrMsg('加载失败!请检查文件');
          }
        },
        header: true,
        delimitersToGuess: [',', '\t'],
      });
    }
  }, [file]);

  return (
    <div className="admin-container">
      {errMsg && (
      <div className="error-message alert alert-danger alert-dismissible fade show" role="alert">
        {errMsg}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
      </div>
      )}
      {successMsg && (
      <div className="error-message alert alert-success alert-dismissible fade show" role="alert">
        {successMsg}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
      </div>
      )}
      <div className="title">管理员上传界面</div>
      {!isLoggedIn && (
        <div className="login-section">
          <div className="mb-3 row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="staticEmail" onKeyPress={handleKeyPress} onChange={(e: any) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="inputPassword" onKeyPress={handleKeyPress} onChange={(e: any) => setpw(e.target.value)} />
            </div>
          </div>
          <button type="submit" className="btn-primary btn" onClick={login}>登陆</button>
        </div>
      )}
      {isLoggedIn && (
        <div className="upload-section">
          <div className="mb-3 row">
            <label htmlFor="upload" className="col-sm-4 col-form-label">上传文件</label>
            <div className="col-sm-8">
              <input ref={fileRef} accept=".csv" type="file" id="upload" className="form-control" onChange={(e: any) => setfile(e.target.files[0])} />
            </div>
          </div>
          <button disabled={isLoading} type="submit" className="btn-primary btn" onClick={upload}>上传</button>
        </div>
      )}
    </div>
  );
}

export default Admin;
