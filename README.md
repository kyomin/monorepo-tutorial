# Multi-Repo
`Multi-Repo`는 `여러 Repository에 Package를 분산해 두는 것을 의미`한다.   
   
말 그대로 하나 또는 두 개 이상의 Package 관리를 하나 또는 두 개 이상의 Repository로 구성하여 관리하는 것이다.   
예를 들어 `A`라는 Package를 구성하는 `B`, `C`라는 Package가 있을 경우 `B-Repository`, `C-Repository`로 나누어 두는 것을 의미한다.   
여기서 꼭 `A`라는 Package가 없어도 상관없다.   
의미 자체를 보면 Package 별로 Repository를 분리한다고 보면 된다.   
보통 Package와 Repository는 `1:1 관계`를 맺으며 통상 사용하는 방식으로 생각하면 된다.   
   
## 장점
### Repository 별 Owner를 지정
- Package 별로 Repository가 분리되어 있다는 것은 각 Package 별로 관리가 가능하다는 것이다.   
이에 대해 각 Repository 별 Owner를 지정할 수 있고, 이로 인해서 패키지 관리가 수월해진다.   

### 빠른 CI Build
- 각 Package가 Repository로 분리된다면 하나의 Repository는 하나의 CI를 구성할 수 있다.   
이렇게 되면 하나의 큰 덩어리로 구성된 Package보다 리소스가 적기 때문에 CI의 Build 속도가 빨라지게 된다.   

### 패키지의 명확한 분리로 인한 유연성 향상
- Repository가 분리되어있기 때문에 각 패키지는 마스터 코드의 충돌을 방지할 수 있으며,   
Repository 상 서로 연계 관계가 없기 때문에 추가, 수정, 유지 관리에 있어서 유연성이 향상된다.   
   
## 단점
### 중복된 설정 및 반복된 설치
- 단일 Package를 구성할 때, 이 패키지를 구성하는 Package를 Repository로 나눔으로써 모든 공통된 설정과 모듈들을 반복적으로 설정 및 설치해야 한다.   
예를 들어, `eslint`와 `babel`을 설정한다고 하면 모든 Repository에 `eslint`와 `babel`을 설치하고 설정 파일을 동일하게 구성해야 한다.   

### 이슈의 분산
- Repository가 분리되어 있기 때문에 각 Repository는 이슈 트래킹을 가진다.   
전혀 다른 Package라면 이슈 트래킹이 분리되는게 정상이지만, 하나의 큰 Package를 구성하고 내부 Sub Package가 필요한 상황이라면 이슈 트래킹은 분리되는 것이 옳지 않다.   
이슈뿐만 아니라 `CHANGELOG(웹 사이트나 프로그램을 제작하는 것 같은 어떤 프로젝트를 진행할 때에 변경 사항에 대한 기록)` 역시 분리됨으로써 관리 포인트가 증가한다.   

### Dependency Hell
- 프로젝트 및 Package의 규모가 커짐에 따라 의존 그래프가 매우 복잡해지게 된다.   
특정 Package들이 같은 모듈을 사용하지만, 버전 차이에 따라 종속성이 달라지고 이로 인한 충돌을 야기할 수 있다.   

### 중복 코드의 가능성
- `중복된 설정 및 반복된 설치`와 비슷한 이유이며, 서로 Repository가 분리되어있기 때문에 공통된 코드가 중복될 가능성이 커진다