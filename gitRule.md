### Commit Type

> 다음은 커밋타입 형식입니다.

| CommitType | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| feat       | 새로운 기능                                                  |
| fix        | 버그 수정                                                    |
| docs       | 문서에 대한 변경 사항                                        |
| style      | 형식 지정, 세미콜론 누락 등, 코드 변경 없음                  |
| refactor   | 프로덕션 코드 리팩토링                                       |
| test       | 누락된 테스트 추가, 테스트 리팩토링, 프로덕션 코드 변경 없음 |
| chore      | 그런트 작업 업데이트 등, 프로덕션 코드 변경 없음             |
| merge      | 코드 Merge                                                   |
| issue      | 프로젝트 Issue                                               |
| init       | 프로젝트 Init                                                |

```java
CommitType(Subject) Content
```

모든 커밋은 위의 커밋 규칙을 지켜 작성한다.

- Subject는 큰 틀
  - ex) ui, mainpage, user, board 등
- Content는 세부적인 것
  - ex) 회원가입 로직 생성, 메인페이지 추가, 프로젝트 설정 등

## 예시

```java
feat(mainpage) 페이지 생성
fix(ui)  회원가입 UI 수정
```
