1. master : 제품으로 출시될 수 있는 브랜치, 배포 Release(Prod) 버전의 소스가 들어있는 branch

- 기본적으로 github 저장소를 생성하면 있는 branch이다. 배포이력을 관리하기 위한 용도로 사용한다.

2. develop : 다음 출시 버전을 개발하는 브랜치, 개발버전의 소스가 들어있는 branch

- 일반적으로 Master branch에 병합하기 전 최종 개발버전의 소스가 들어있다. 다음 Release될 버전의 소스라고 생각하면 된다.
  3.feature : 기능을 개발하는 브랜치
- 개발자들이 기능개발을 위하여 생성/이용 하는 branch이다. 개발이 완료되면 develop와 병합하여 다른 사람들과 공유한다.

4. release : 이번 출시 버전을 준비하는 브랜치
5. hotfix : 출시 버전에서 발생한 버그를 수정 하는 브랜치, Master branch의 오류사항을 수정하는 branch

- Feature > Develop > Master의 병합순이 아니라 Master에서 급하게 수정해야하는 경우에 사용한다. Master에서 직접 branch를 분기하여 생성하며 수정 후 Develop가 아닌 Master에 병합하여 배포한다.
