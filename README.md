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
   
# Mono-Repo
`Multi-Repo`와 반대로 `Mono-Repo`는 `여러 Package를 Repository에서 관리하는 것을 의미`한다.   
   
`Multi-Repo`의 단점을 보완하면서 분리된 Package를 하나의 Repository로 합쳐 관리한다.   
쉽사리 실업무에 적용해 보기 쉽지 않기 때문에 `Multi-Repo`에 비해 활성화가 많이 되지는 않았다.   
하지만 점차적으로 오픈 소스에서 지원하는 기능(CLI, UI, Core)이 많아지면서 오픈 소스에서 `Mono-Repo`를 많이 채택하고 있다.   
   
이러한 `Mono-Repo`에 대해서 어떤 장단점이 있는지 알아본다.   
   
## 장점
### 공통 항목 단일화
- eslint, Build, Unit Test 등 공통된 설정 및 필요한 node module을 한 번의 설치와 한 번의 설정으로 모든 패키지가 사용할 수 있다.   
Repository가 분산되어있지 않고 하나의 Repository에 있기 때문에 dependencies의 업데이트 역시 한 번으로 해결이 가능하다.   

### 쉬운 Pacakge 공유
- `Multi-Repo`의 경우 Pacakge가 분리되어 있기 때문에 Pacakge 간 공유가 쉽지 않다.   
그렇기 때문에 중복 코드가 발생할 가능성이 있는데, `Mono-Repo`의 경우엔 하나의 Repository이기 때문에 패키지 간 공유가 수월하며 중복 코드 역시 발생할 염려가 없다.   

### 단일 이슈 트래킹
- 하나의 Repository에 패키지가 `Mono-Repo`로 구성되었다면 그 패키지의 모든 종속된 패키지는 서로 연관 관계를 가질 수 있다.   
이로 인해서 이슈 트래킹은 분산 없이 하나로 처리가 가능하며 `Mono-Repo`는 이를 지원한다.   

### 효율적인 의존성 관리
- 전체 Package의 의존 관계가 하나의 Repository에서 이루어지기 때문에 Package 간 의존성 관리가 수월해 진다.   
   
## 단점
### Repository의 거대화
- 분산되어 있던 모든 리소스를 하나의 Repository에서 관리가 되기 때문에 하나의 Repository의 규모가 커진다.   
이로 인한 문제들은 나비효과처럼 커질 가능성을 보인다.   

### 느린 CI Build
- `Multi-Repo`와 반대로 Repository가 하나로 되어 있기 때문에 `CI가 하나로 구성된다는 장점`이 있지만, Package가 규모가 커짐으로 인해 분산된 CI Build보다 속도가 느릴 수밖에 없다.   

### 무분별한 의존성
- Package 간 의존성 관리가 쉽다는 장점이 있지만, 오히려 이러한 장점으로 인해 과도한 의존 관계가 나타날 수 있다.   

### Dev Tools의 인덱싱 저하
- 개발 도구를 사용할 때 Package가 분산되어 있다면 각각의 Package를 열어 사용하면 되지만, `Mono-Repo`의 경우는 하나의 개발 도구로 열 경우 해당 Package의 인덱싱 처리 속도가 길어진다.   
   
위 내용을 얼추 보면 `Mono-Repo`의 장점은 `Multi-Repo`의 단점이고, `Multi-Repo`의 장점은 `Mono-Repo`의 단점이라는 것을 알 수 있다.   
이렇게 장단점이 교차하기 때문에 무조건 `Mono-Repo`가 좋은 것은 아니다.   
어떤 상황에서는 `Multi-Repo`가 빛을 발하는 경우가 있을 것이다.   
   
# 규모가 큰 Mono-Repo의 대표적인 사례
사실 `Mono-Repo`가 활성화되는 시점은 이 사례부터일지도 모른다.   
이 사례를 통해서 `Mono-Repo`를 보장한다고 볼 수 있다.   
   
### Google
- 초기 Google은 중앙 집중식 소스 제어 시스템을 통해 관리되는 공유 코드 베이스로 작업하기로 결정했다.   
이 접근 방식은 16년 이상 Google에 좋은 서비스를 제공해 왔으며, 오늘날 Google의 소프트웨어 대부분이 `Mono-Repo`로 구성되어있다.   
대표적인 예로 Google은 `Bazel`을 빌드 시스템으로 사용하며, `Mono-Repo`로 구성되어있다.   

### Facebook
- 수십만 개의 파일에 대해 매주 수천 개의 커밋이 있는 Facebook의 기본 소스 저장소는 Linux 커널보다 훨씬 더 크다.   
대표적으로 `Buck` 및 `Scaling Mercurial`이 있다.