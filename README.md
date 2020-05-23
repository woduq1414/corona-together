
### 참고한 것
https://github.com/hidekuma/flask-react-webpack3

https://github.com/Leo-G/Flask-SQLALchemy-RESTFUL-API

이 두 레포지토리를 참고해서 만든 구조입니다.

## 사용하는 방법

### 0) 클론
    git clone

### 0-1) 파이참 설정
파이참에서 Open 하고 clone 받은 폴더 선택

File - Settings - Project Interpreter - 우측 톱니바퀴 - Add - 인터프리터 설정 후 확인해서 가상 환경 설정

### 1) 패키지 설치
    pip install -r requirements.txt
    cd static/myapp
    yarn install
yarn 안 깔려 있으면 npm install -g yarn 으로 깔아주세요.

### 2) DB 설정

config.ini 파일을 폴더 최상단에 만들어주세요.
    
    [DEFAULT]
    SECRET_KEY = mysecretkey
    LOCAL_DB_HOSTNAME = localhost
    LOCAL_DB_NAME = mydbname
    LOCAL_DB_PASSWORD = mypassword
    LOCAL_DB_USERNAME = myusername
위와 같이 작성해주고(DB 정보와 시크릿 키는 잘 바꿔주세요~) cmd에서 아래를 실행시키세요. 

    python migrate.py db init
    python migrate.py db migrate
    python migrate.py db upgrade


### 3) 실행
    python run.py
로 백엔드 서버를 실행하고,,

    cd static/myapp
    yarn start
로 다른 터미널을 열어 프론트엔드 개발 서버를 실행합니다.
이제 http://localhost:8080/ 로 접속하면 돼요.

### 4) 배포
배포 할 때는 

    cd static/myapp
    yarn build

해주세요~
     
