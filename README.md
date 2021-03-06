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
   
# Mono-Repo는 언제 사용해야할까?
`Mono-Repo`를 구성하는 적절한 시기는 정확하지 않다.   
그러므로 구글링 자체로도 정보를 얻기엔 힘든 부분이 있다.   
이러한 이유는 모든 프로젝트와 Package의 구조가 규모, 형태, 구조가 모두 다르기 때문이다.   
하지만 아래와 같은 상황이라면 `Mono-Repo`를 구성해도 좋다.   
   
1. 서로 다른 패키지가 연관 관계를 가질 경우   
2. 첫 번째 항목이 고려된 상황에서 `N개의 패키지의 형태와 목적이 유사`한 경우   
3. 두 번째 항목이 고려된 상황에서 `N개의 패키지 중 배포되어야 할 패키지의 비중이 큰` 경우   
   
이 외에 애매한 경우는 Package의 규모이다.   
Package가 클수록 개발 및 Build 등 Mono-Repo로 투자되는 비용이 많이 들기에 적당한 규모를 찾아야 하는데, 이는 설계자 또는 개발자 역량에 따라 다르기 때문에 참고해야 한다.   
   
# Lerna
`lerna`는 **Git과 NPM을 사용하여 Mono-Repo 관리와 Workflow를 최적화는 도구**이다.   
   
## 특징
`lerna`의 특징은 `Mono-Repo`를 구성하고 배포하는 데 중점에 둔 기능으로 볼 수 있다.   

### 다중 패키지의 종속성 관리 및 모듈의 중복성 제거
- lerna를 사용하여 node module을 설치할 경우 자체적으로 패키지들의 모듈을 설치하며, 그 과정에서 종속성을 관리하여 중복된 모듈을 하나로 통합한다.   

### 다중 패키지의 단일 버전 및 독립적 버전 관리
- `Mono-Repo`의 구성을 따르면 여러 개의 Package로 구성된다.   
이런 Package는 어떤 상황에서 하나의 버전 정책을 가져갈 수 있지만, 또 어떤 경우에는 서로 독립적인 버전 정책을 가져가야 하는 경우가 있는데, `lerna`는 이러한 기능을 지원하여 버전 정책을 정할 수 있다.   

### 변경된 패키지를 일괄적으로 Git Remote Repository에 Push
- 여러 Package가 수정되었다면 Package 별로 Git Remote Repository에 commit과 push를 할 필요가 없다.   
`lerna`를 사용하면 단 한 번의 commit과 push로 Git Remote Repository에 반영할 수 있다.   

### 변경된 패키지를 일괄적으로 NPM Repository에 Publish
- NPM Repository에 node module을 배포하기 위해서 `publish` 명령을 사용한다.   
`Mono-Repo`에서 각 Package를 NPM Repository에 배포하기 위해서 하나하나 publish를 입력할 필요가 없다.   
**단 한 번의 publish로 변경 사항이 있는 Package만 배포**가 될 것이다.   
   
# lerna의 구조
`lerna`의 기본 구조는 Root 경로 아래 `packages` 폴더가 있고, 그 하위에 각각 package별 폴더가 생성된다.   
`packages` 폴더는 기본값이며 설정에 따라 유동적으로 변경할 수 있다(현 프로젝트에서는 components로 명명하였다).   
각 pacakge 폴더는 pacakge 별 이름을 지정할 수 있으며, 각각의 pacakges에는 `package.json`이 명시되는 것처럼 **하나의 모듈로 간주**한다.   
   
Root 경로에 있는 `package.json`에는 모든 package가 공통으로 사용하는 `dependencies`가 명시되는 등 공통 항목이 나열된다.   
   
![레르나 폴더 구조](https://user-images.githubusercontent.com/46395776/165488045-b4f37e6b-ee07-405d-b6fc-73c570221906.png)   
   
# lerna의 주요 기능
### Fixed Mode
- 다중 패키지의 버전이 `단일 버전 라인`에서 작동하며 관리   
- 버전은 프로젝트 Root에서 관리되며 `lerna publish`를 실행할 경우 새 버전으로 패키지를 게시   
- 하나의 패키지가 수정되더라도 모든 패키지는 새로운 버전을 게시   
   
### Independent Mode
- 패키지의 유지 관리자가 서로 `독립적으로 패키지 버전을 관리`   
- `lerna publish` 시 변경된 패키지에 대해서만 새 버전을 업데이트   
- 버전은 각 패키지의 package.json에 명시   
   
### Hoisting
- 다중 패키지에서 사용되는 node module을 최적화하여 중복되는 node module을 최상위 경로로 재구축   
- 공통 종속성은 최상위 수준에서만 설치되며 개별 패키지는 생략   
   
![모노레포 호이스트](https://user-images.githubusercontent.com/46395776/165493427-280385f7-f107-4e7c-935d-2ff68e25e5ec.png)   
   
위 그림에서 보듯이 `hoist`를 통해서 node_module을 최적화하여 중복되는 모듈 B(1.0)을 최상위로 재구축한다.   
   
# lerna 주요 명령어
`lerna`의 핵심 명령어는 `bootstrap`과 `publish`이다.   
`bootstrap`을 통해서 모든 package에 node module을 설치하며 최적화를 통해 중복된 모듈을 정리해준다.   
`publish`는 `npm publish`와 동일한 기능을 하지만 `lerna`에서는 모든 pacakge를 대상으로 한 번의 명령어로 배포할 수 있다.
### lerna clean
Root를 제외한 package에서 node_module을 제거한다.   

### lerna bootstrap
모든 패키지의 node_module을 설치한다.   

### lerna run
각 패키지의 package.json에 명시된 script를 실행한다.   

### lerna publish
마지막 릴리즈 이후 업데이트 된 패키지를 배포한다.   

### lerna exec
각 패키지에서 임의의 커맨드 명령어를 실행한다.