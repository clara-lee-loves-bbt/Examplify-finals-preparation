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
      print(c.n)`,
    ans: '5',
    exp: '`inc` returns the same object, so the second `.inc(3)` is called on `c` again: 0 + 2 + 3 = 5.' },

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
      print(a.v, c.v, a is b, a == c)`,
    ans: '5 1 True False',
    exp: '`b` is another name for the same object as `a`. `c` is a separate instance. Without a custom `__eq__`, `==` on objects compares identity, so `a == c` is `False`.' },

  { id: 'L11-03', lec: 11, topic: 'Magic methods', d: 1, type: 'out',
    t: '__str__ and print',
    code: `
      class P:
          def __init__(self, x, y):
              self.x, self.y = x, y

          def __str__(self):
              return f'({self.x}, {self.y})'

      print(P(1, 2))`,
    ans: '(1, 2)',
    exp: '`print` calls `str()` on the object, which uses `__str__`.' },

  { id: 'L11-04', lec: 11, topic: 'Magic methods', d: 1, type: 'mcq',
    t: 'Printing without __str__',
    q: 'A class `Pt` defines only `__init__`. What does `print(Pt())` show?',
    opts: ['Something like <__main__.Pt object at 0x7f…>', 'An empty line', 'AttributeError', 'Pt()'],
    ans: 0,
    exp: 'Without `__str__`, Python uses the default representation: the class name and a memory address.' },

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
      print(a + a + V(0, 1))`,
    ans: 'V(2, 5)',
    exp: '`+` calls `__add__` from left to right: `(a + a)` is `V(2, 4)`, then adding `V(0, 1)` gives `V(2, 5)`.' },

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
          print(p.speak())`,
    ans: 'A ...\nB woof',
    exp: '`Dog` inherits `__init__` but **overrides** `speak`. Which version runs depends on the actual class of each object.' },

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
      print(b.name, b.legs)`,
    ans: 'Tweety 2',
    exp: '`super().__init__` sets `name` and `legs = 4`, then the subclass overwrites `legs` with 2.' },

  { id: 'L11-08', lec: 11, topic: 'Inheritance', d: 2, type: 'mcq', run: true,
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
      print(c.lives, c.name)`,
    opts: ['AttributeError', '9 Tom', '9 None', 'TypeError'],
    ans: 0,
    exp: '`Cat.__init__` overrides `Pet.__init__` and never calls it, so `self.name` is never set. Reading `c.name` raises `AttributeError`, and because the arguments are evaluated before printing, nothing is printed.' },

  { id: 'L11-09', lec: 11, topic: 'Inheritance', d: 1, type: 'mcq', run: true,
    t: 'isinstance with subclasses',
    q: 'What is printed?',
    code: `
      class A:
          pass

      class B(A):
          pass

      print(isinstance(B(), A), isinstance(A(), B))`,
    opts: ['True False', 'True True', 'False False', 'False True'],
    ans: 0,
    exp: 'Every B **is an** A, because a subclass instance is also an instance of its superclass. A plain A is not a B.' },

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
      print(a.withdraw(70))`,
    ans: '0',
    exp: '100 → 70. Withdrawing 80 is refused because 80 > 70. Then 70 ≤ 70, so the balance drops to 0.' },

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

      print(Sq(3).describe(), Shape().describe())`,
    ans: 'area=9 area=0',
    exp: '`describe` is inherited, but inside it `self.area()` calls the method of the **actual** object\'s class. For a `Sq`, that is the overriding `area`.' },

  { id: 'L11-12', lec: 11, topic: 'self', d: 2, type: 'mcq', run: true,
    t: 'A method without self',
    q: 'What happens?',
    code: `
      class T:
          def hello():
              return 'hi'

      print(T().hello())`,
    opts: ['TypeError', 'hi', 'AttributeError', 'None'],
    ans: 0,
    exp: 'Calling a method on an instance passes the instance in automatically as the first argument. `hello` takes no parameters, so Python raises `TypeError` (takes 0 positional arguments but 1 was given).' },

  { id: 'L11-13', lec: 11, topic: 'Classes', d: 1, type: 'fib',
    t: 'A rectangle class',
    q: 'Complete `Rect` so that `Rect(3, 4).area()` returns `12`.',
    code: `
      class Rect:
          def __init__(self, w, h):
              {{1}}
              self.h = h

          def area(self):
              return {{2}}`,
    blanks: [['self.w = w'], ['self.w * self.h', 'self.h * self.w']],
    test: 'assert Rect(3, 4).area() == 12\nr = Rect(2, 5)\nassert r.w == 2 and r.h == 5',
    exp: 'Attributes live on `self`. A bare `w` inside `area` would be an undefined local name.' },

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
              {{1}}`,
    blanks: [['super().__init__(s, s)', 'Rect.__init__(self, s, s)']],
    test: 'sq = Square(5)\nassert sq.area() == 25 and isinstance(sq, Rect)',
    exp: 'A square is a rectangle whose width and height are both `s`. `super()` reaches the superclass, and `self` is passed implicitly.' },

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
              return f'{self.n}/{self.d}'`,
    blanks: [['self.n * o.d + o.n * self.d', 'o.n * self.d + self.n * o.d', 'self.n * o.d + self.d * o.n', 'o.d * self.n + o.n * self.d']],
    test: "assert str(Frac(1, 2) + Frac(1, 3)) == '5/6'\nassert str(Frac(2, 5) + Frac(1, 5)) == '15/25'",
    exp: 'a/b + c/d = (a·d + c·b) / (b·d). It returns a **new** `Frac`, so neither operand is changed.' },

  { id: 'L11-16', lec: 11, topic: 'Polymorphism', d: 1, type: 'mcq',
    t: 'What polymorphism means',
    q: 'Which statement best describes **polymorphism**?',
    opts: ['The same method call behaves differently depending on the object\'s actual class',
           'A class can have only one method',
           'A subclass copies the source code of its superclass',
           'Objects cannot be changed after they are created'],
    ans: 0,
    exp: 'E.g. `pet.speak()` in a loop over Pets, Dogs and Parrots runs a different `speak` for each, through the same interface.' },

  { id: 'L11-17', lec: 11, topic: 'self', d: 1, type: 'mcq',
    t: 'What self is',
    q: 'Inside a method, what does `self` refer to?',
    opts: ['The particular instance the method was called on', 'The class itself', 'The superclass', 'A copy of the instance'],
    ans: 0,
    exp: '`v1.length()` is really `MyVector.length(v1)`, so `self` is that same object, not a copy. That is why mutating `self.x` changes the object.' },

  { id: 'L11-18', lec: 11, topic: 'Attributes', d: 2, type: 'out',
    t: 'An attribute that aliases a list',
    code: `
      class Team:
          def __init__(self, members):
              self.members = members

      names = ['Ann']
      t = Team(names)
      names.append('Bob')
      print(len(t.members))`,
    ans: '2',
    exp: 'The attribute stores a reference to the caller\'s list, not a copy, so later changes to `names` show through `t.members`. Use `members.copy()` to avoid this.' },

  { id: 'L11-19', lec: 11, topic: 'Magic methods', d: 2, type: 'out',
    t: 'str() calls __str__',
    code: `
      class Temp:
          def __init__(self, c):
              self.c = c

          def __str__(self):
              return f'{self.c * 9 / 5 + 32}F'

      print('Now: ' + str(Temp(100)))`,
    ans: 'Now: 212.0F',
    exp: '`str(obj)` calls `__str__`. `/` gives a float, so the value is `212.0`.' },

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

      print(C().f())`,
    ans: 'CBA',
    exp: 'Each override adds its letter and then hands over to its superclass\'s version: C → B → A.' },

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
          pass

      print([a.sound() for a in (Animal(), Cow(), Calf())])`,
    ans: "['?', 'moo', 'moo']",
    exp: '`Calf` defines nothing, so Python looks up the hierarchy and finds `Cow.sound` first.' },

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
      print(a.x, a.y, b.x, b.y)`,
    ans: '2 4 3 6',
    exp: '`scaled` returns a new object and leaves `a` alone. `scale` mutates `a` in place, like the lecture\'s `normalize`.' },

  { id: 'L11-23', lec: 11, topic: 'Magic methods', d: 3, type: 'mcq', run: true,
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
      print(r)`,
    opts: ['Error!\nNone', 'TypeError', '6', 'Error!'],
    optCode: true,
    ans: 0,
    exp: 'Since 5 is not a `V`, `__add__` prints `Error!` and falls off the end, returning `None`. So `r` is `None`, and printing it shows `None`.' },

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
              self.hp -= 5`,
    blanks: [['super().__init__(name)', 'Fighter.__init__(self, name)'],
             ['super().attack(enemy)', 'Fighter.attack(self, enemy)', 'enemy.hp -= self.atk']],
    test: "b, f = Berserker('B'), Fighter('F')\nb.attack(f)\nb.attack(f)\nassert (f.hp, b.hp, b.name) == (50, 90, 'B')",
    exp: 'Call the superclass constructor first so `name` and `hp` are set, then override `atk`. In `attack`, reuse the parent\'s attack (which uses `self.atk`, now 25) and then add the self-damage.' },

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

      print(Par().v, Chi().v)`,
    ans: '11 20',
    exp: '`Chi` inherits `__init__`, but inside it `self.calc` is looked up on the actual object, a `Chi`, so the overriding `calc` runs even from the parent\'s constructor.' }
]);
