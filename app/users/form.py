from flask_wtf import FlaskForm
from wtforms import *


class RegisterForm(FlaskForm):
    id = StringField('아이디',
                     [validators.InputRequired(), validators.Regexp(regex='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$')],
                     description="영문/숫자 섞어서 6~15자")
    password = PasswordField('비밀번호', [validators.InputRequired(), validators.Regexp(
        regex='^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&-_])[A-Za-z\d$@$!%*#?&-_]{6,15}$')],
                             description="영문/숫자/특수문자 섞어서 6~15자")
    nickname = StringField('별명', [validators.InputRequired(), validators.Regexp(regex='^[가-힣0-9A-Za-z]{2,10}$')],
                           description="한글,영문,숫자 사용 가능, 2~10자")
    submit = SubmitField('회원가입')
    class Meta:
        csrf = False

