/* Lecture 11 — Object-oriented programming: classes, instances, self,
   __init__ / __str__ / __add__, inheritance, super(), polymorphism */
practice([
  { id: 'L11-01', lec: 11, topic: 'Classes', d: 2, type: 'out',
    t: 'Methods that return self',
    code: `
      class Counter:
          def __init__(self):
              self.n = 0

          def inc(self, k):
              self.n += k
              return self

      c = Counter()
      c.inc(2).inc(3)
      print(c.n)` },

  { id: 'L11-02', lec: 11, topic: 'Instances', d: 2, type: 'out',
    t: 'Aliases and equal-looking objects',
    code: `
      class Box:
          def __init__(self, v):
              self.v = v

      a = Box(1)
      b = a
      c = Box(1)
      b.v = 5
      print(a.v, c.v, a is b, a == c)` },

  { id: 'L11-03', lec: 11, topic: 'Magic methods', d: 1, type: 'out',
    t: '__str__ and print',
    code: `
      class P:
          def __init__(self, x, y):
              self.x, self.y = x, y

          def __str__(self):
              return f'({self.x}, {self.y})'

      print(P(1, 2))` },

  { id: 'L11-04', lec: 11, topic: 'Magic methods', d: 1, type: 'mcq',
    t: 'Printing without __str__',
    q: 'A class `Pt` defines only `__init__`. What does `print(Pt())` show?' },

  { id: 'L11-05', lec: 11, topic: 'Magic methods', d: 2, type: 'out',
    t: '__add__ chaining',
    code: `
      class V:
          def __init__(self, x, y):
              self.x, self.y = x, y

          def __add__(self, o):
              return V(self.x + o.x, self.y + o.y)

          def __str__(self):
              return f'V({self.x}, {self.y})'

      a = V(1, 2)
      print(a + a + V(0, 1))` },

  { id: 'L11-06', lec: 11, topic: 'Polymorphism', d: 1, type: 'out',
    t: 'Overriding a method',
    q: 'What is printed? (Type each line on its own line.)',
    code: `
      class Pet:
          def __init__(self, name):
              self.name = name

          def speak(self):
              return self.name + ' ...'

      class Dog(Pet):
          def speak(self):
              return self.name + ' woof'

      for p in [Pet('A'), Dog('B')]:
          print(p.speak())` },

  { id: 'L11-07', lec: 11, topic: 'Inheritance', d: 2, type: 'out',
    t: 'super().__init__ then override',
    code: `
      class Pet:
          def __init__(self, name):
              self.name = name
              self.legs = 4

      class Bird(Pet):
          def __init__(self, name):
              super().__init__(name)
              self.legs = 2

      b = Bird('Tweety')
      print(b.name, b.legs)` },

  { id: 'L11-08', lec: 11, topic: 'Inheritance', d: 2, type: 'mcq',
    t: 'Forgetting super().__init__',
    q: 'What happens?',
    code: `
      class Pet:
          def __init__(self, name):
              self.name = name

      class Cat(Pet):
          def __init__(self, name):
              self.lives = 9

      c = Cat('Tom')
      print(c.lives, c.name)` },

  { id: 'L11-09', lec: 11, topic: 'Inheritance', d: 1, type: 'mcq',
    t: 'isinstance with subclasses',
    q: 'What is printed?',
    code: `
      class A:
          ...

      class B(A):
          ...

      print(isinstance(B(), A), isinstance(A(), B))` },

  { id: 'L11-10', lec: 11, topic: 'Classes', d: 2, type: 'out',
    t: 'One method calling another',
    code: `
      class Acc:
          def __init__(self, bal):
              self.bal = bal

          def can(self, amt):
              return amt <= self.bal

          def withdraw(self, amt):
              if self.can(amt):
                  self.bal -= amt
              return self.bal

      a = Acc(100)
      a.withdraw(30)
      a.withdraw(80)
      print(a.withdraw(70))` },

  { id: 'L11-11', lec: 11, topic: 'Polymorphism', d: 3, type: 'out',
    t: 'Inherited method, overridden helper',
    code: `
      class Shape:
          def area(self):
              return 0

          def describe(self):
              return f'area={self.area()}'

      class Sq(Shape):
          def __init__(self, s):
              self.s = s

          def area(self):
              return self.s ** 2

      print(Sq(3).describe(), Shape().describe())` },

  { id: 'L11-12', lec: 11, topic: 'self', d: 2, type: 'mcq',
    t: 'A method without self',
    q: 'What happens?',
    code: `
      class T:
          def hello():
              return 'hi'

      print(T().hello())` },

  { id: 'L11-13', lec: 11, topic: 'Classes', d: 1, type: 'fib',
    t: 'A rectangle class',
    q: 'Complete `Rect` so that `Rect(3, 4).area()` returns `12`.',
    code: `
      class Rect:
          def __init__(self, w, h):
              {{1}}
              self.h = h

          def area(self):
              return {{2}}` },

  { id: 'L11-14', lec: 11, topic: 'Inheritance', d: 2, type: 'fib',
    t: 'A Square built on Rect',
    q: 'Complete `Square` so that it reuses `Rect`\'s constructor.',
    code: `
      class Rect:
          def __init__(self, w, h):
              self.w = w
              self.h = h

          def area(self):
              return self.w * self.h

      class Square(Rect):
          def __init__(self, s):
              {{1}}` },

  { id: 'L11-15', lec: 11, topic: 'Magic methods', d: 2, type: 'fib',
    t: 'Adding fractions',
    q: 'Complete `__add__` so that `print(Frac(1, 2) + Frac(1, 3))` shows `5/6` (no simplifying needed).',
    code: `
      class Frac:
          def __init__(self, n, d):
              self.n, self.d = n, d

          def __add__(self, o):
              return Frac({{1}}, self.d * o.d)

          def __str__(self):
              return f'{self.n}/{self.d}'` },

  { id: 'L11-16', lec: 11, topic: 'Polymorphism', d: 1, type: 'mcq',
    t: 'What polymorphism means',
    q: 'Which statement best describes **polymorphism**?' },

  { id: 'L11-17', lec: 11, topic: 'self', d: 1, type: 'mcq',
    t: 'What self is',
    q: 'Inside a method, what does `self` refer to?' },

  { id: 'L11-18', lec: 11, topic: 'Attributes', d: 2, type: 'out',
    t: 'An attribute that aliases a list',
    code: `
      class Team:
          def __init__(self, members):
              self.members = members

      names = ['Ann']
      t = Team(names)
      names.append('Bob')
      print(len(t.members))` },

  { id: 'L11-19', lec: 11, topic: 'Magic methods', d: 2, type: 'out',
    t: 'str() calls __str__',
    code: `
      class Temp:
          def __init__(self, c):
              self.c = c

          def __str__(self):
              return f'{self.c * 9 / 5 + 32}F'

      print('Now: ' + str(Temp(100)))` },

  { id: 'L11-20', lec: 11, topic: 'Inheritance', d: 3, type: 'out',
    t: 'A chain of super() calls',
    code: `
      class A:
          def f(self):
              return 'A'

      class B(A):
          def f(self):
              return 'B' + super().f()

      class C(B):
          def f(self):
              return 'C' + super().f()

      print(C().f())` },

  { id: 'L11-21', lec: 11, topic: 'Inheritance', d: 2, type: 'out',
    t: 'Inheriting through two levels',
    code: `
      class Animal:
          def sound(self):
              return '?'

      class Cow(Animal):
          def sound(self):
              return 'moo'

      class Calf(Cow):
          ...

      print([a.sound() for a in (Animal(), Cow(), Calf())])` },

  { id: 'L11-22', lec: 11, topic: 'Classes', d: 3, type: 'out',
    t: 'Mutating self in a method',
    code: `
      class V:
          def __init__(self, x, y):
              self.x, self.y = x, y

          def scale(self, k):
              self.x *= k
              self.y *= k

          def scaled(self, k):
              return V(self.x * k, self.y * k)

      a = V(1, 2)
      b = a.scaled(3)
      a.scale(2)
      print(a.x, a.y, b.x, b.y)` },

  { id: 'L11-23', lec: 11, topic: 'Magic methods', d: 3, type: 'mcq', optCode: true,
    t: '__add__ with the wrong type',
    q: 'What is printed?',
    code: `
      class V:
          def __init__(self, x):
              self.x = x

          def __add__(self, o):
              if isinstance(o, V):
                  return V(self.x + o.x)
              else:
                  print('Error!')

      r = V(1) + 5
      print(r)` },

  { id: 'L11-24', lec: 11, topic: 'Inheritance', d: 2, type: 'fib',
    t: 'RPG fighter subclass',
    q: 'A `Berserker` starts like a `Fighter` but hits for 25, and after every attack it loses 5 of its own hp. Complete it, reusing `Fighter`\'s code.',
    code: `
      class Fighter:
          def __init__(self, name):
              self.name = name
              self.hp = 100
              self.atk = 10

          def attack(self, enemy):
              enemy.hp -= self.atk

      class Berserker(Fighter):
          def __init__(self, name):
              {{1}}
              self.atk = 25

          def attack(self, enemy):
              {{2}}
              self.hp -= 5` },

  { id: 'L11-25', lec: 11, topic: 'Polymorphism', d: 3, type: 'out',
    t: 'A constructor that calls an overridden method',
    code: `
      class Par:
          def __init__(self):
              self.calc(10)

          def calc(self, i):
              self.v = i + 1

      class Chi(Par):
          def calc(self, i):
              self.v = i * 2

      print(Par().v, Chi().v)` }
]);
