/* Lecture 11 — answer key.
   Each entry: the trap the question tests, the answer, and every wrong
   option labelled with the trap it tests. `mut` means the checker re-derives
   that wrong option by rewriting the code the way the trap misreads it
   (tools/trapkit.py); `why` explains a hand-written one.
   Checked by `python tools/check_practice.py`. */
answers({
  'L11-01': {
    trap: 'oop-self',
    ans: '5',
    wrong: [
      { a: '2', trap: 'oop-self', why: '`inc` returns self, so `.inc(3)` runs on the **same** counter: 2 + 3.' },
      { a: '0', trap: 'oop-self', why: 'The methods change c itself through self.' }],
    exp: '`inc` returns the same object, so the second `.inc(3)` is called on `c` again: 0 + 2 + 3 = 5.' },

  'L11-02': {
    trap: 'alias',
    ans: '5 1 True False',
    wrong: [
      { a: '5 5 True True', trap: 'alias', why: 'c is a separate Box; only a and b share one object.' },
      { a: '1 1 True False', trap: 'alias', why: 'b is the same object as a, so `b.v = 5` changes a.v too.' },
      { a: '5 1 True True', trap: 'is-identity', why: 'Without its own equality method, `==` on objects compares identity, so two different Boxes are not equal.' }],
    exp: '`b` is another name for the same object as `a`. `c` is a separate instance. Without a custom `__eq__`, `==` on objects compares identity, so `a == c` is `False`.' },

  'L11-03': {
    trap: 'str-dunder',
    ans: '(1, 2)',
    wrong: [
      { a: '<__main__.P object at 0x7f...>', trap: 'str-dunder', why: 'P defines `__str__`, so print shows its return value.' },
      { a: 'P(1, 2)', trap: 'str-dunder', why: 'print shows exactly the string `__str__` returns: (1, 2).' }],
    exp: '`print` calls `str()` on the object, which uses `__str__`.' },

  'L11-04': {
    trap: 'str-dunder',
    ans: 'Something like <__main__.Pt object at 0x7f…>',
    wrong: [
      { a: 'An empty line', trap: 'str-dunder', why: 'Without `__str__`, print shows the default form `<__main__.Pt object at 0x...>`.' },
      { a: 'AttributeError', trap: 'str-dunder', why: 'Every object can be printed; there is a default form.' },
      { a: 'Pt()', trap: 'str-dunder', why: 'The default shows the class and a memory address, not the call.' }],
    exp: 'Without `__str__`, Python uses the default representation: the class name and a memory address.' },

  'L11-05': {
    trap: 'dunder-add',
    ans: 'V(2, 5)',
    wrong: [
      { a: 'V(1, 2)V(1, 2)V(0, 1)', trap: 'dunder-add', why: '`+` calls `__add__`, which builds one new V; the strings are not joined.' },
      { a: 'V(3, 5)', trap: 'dunder-add', why: '`a + a` doubles a to V(2, 4); then V(0, 1) is added.' }],
    exp: '`+` calls `__add__` from left to right: `(a + a)` is `V(2, 4)`, then adding `V(0, 1)` gives `V(2, 5)`.' },

  'L11-06': {
    trap: 'override',
    ans: 'A ...\nB woof',
    wrong: [
      { a: 'A woof\nB woof', trap: 'override', why: 'Pet objects still use Pet.speak; only Dog overrides it.' },
      { a: 'A ...\nB ...', trap: 'override', mut: 'override:0' }],
    exp: '`Dog` inherits `__init__` but **overrides** `speak`. Which version runs depends on the actual class of each object.' },

  'L11-07': {
    trap: 'override',
    ans: 'Tweety 2',
    wrong: [
      { a: 'Tweety 4', trap: 'override', mut: 'override:0' },
      { a: 'AttributeError', trap: 'super-init', mut: 'super-init:0' }],
    exp: '`super().__init__` sets `name` and `legs = 4`, then the subclass overwrites `legs` with 2.' },

  'L11-08': {
    trap: 'super-init',
    run: true,
    ans: 'AttributeError',
    wrong: [
      { a: '9 Tom', trap: 'super-init', why: '`Cat.__init__` never calls `super().__init__`, so `self.name` is never set.' },
      { a: '9 None', trap: 'super-init', why: 'A missing attribute raises `AttributeError`; it is not None.' },
      { a: 'TypeError', trap: 'super-init', why: 'The constructor call is fine; reading `c.name` is the problem: `AttributeError`.' }],
    exp: '`Cat.__init__` overrides `Pet.__init__` and never calls it, so `self.name` is never set. Reading `c.name` raises `AttributeError`, and because the arguments are evaluated before printing, nothing is printed.' },

  'L11-09': {
    trap: 'isinstance-up',
    run: true,
    ans: 'True False',
    wrong: [
      { a: 'True True', trap: 'isinstance-up', why: 'A B is an A, but an A is **not** a B: inheritance only goes one way.' },
      { a: 'False False', trap: 'isinstance-up', why: 'B inherits from A, so a B object is also an instance of A.' },
      { a: 'False True', trap: 'isinstance-up', why: 'Reversed: a subclass object counts as its superclass, not the other way round.' }],
    exp: 'Every B **is an** A, because a subclass instance is also an instance of its superclass. A plain A is not a B.' },

  'L11-10': {
    trap: 'state-trace',
    ans: '0',
    wrong: [
      { a: '-10', trap: 'state-trace', why: '`withdraw(80)` is refused because 80 > 70, so the balance is still 70 before the last withdrawal.' },
      { a: '70', trap: 'boundary', mut: 'boundary:0' }],
    exp: '100 → 70. Withdrawing 80 is refused because 80 > 70. Then 70 ≤ 70, so the balance drops to 0.' },

  'L11-11': {
    trap: 'override',
    ans: 'area=9 area=0',
    wrong: [
      { a: 'area=0 area=0', trap: 'override', mut: 'override:1' },
      { a: 'TypeError', trap: 'override', mut: 'override:0' }],
    exp: '`describe` is inherited, but inside it `self.area()` calls the method of the **actual** object\'s class. For a `Sq`, that is the overriding `area`.' },

  'L11-12': {
    trap: 'oop-self',
    run: true,
    ans: 'TypeError',
    wrong: [
      { a: 'hi', trap: 'oop-self', why: 'Calling through an instance passes the instance as the first argument, but hello takes none: `TypeError`.' },
      { a: 'AttributeError', trap: 'oop-self', why: 'The method exists; the problem is the missing self parameter.' },
      { a: 'None', trap: 'oop-self', why: 'The call fails before hello runs.' }],
    exp: 'Calling a method on an instance passes the instance in automatically as the first argument. `hello` takes no parameters, so Python raises `TypeError` (takes 0 positional arguments but 1 was given).' },

  'L11-13': {
    trap: 'oop-self',
    blanks: [['self.w = w'], ['self.w * self.h', 'self.h * self.w']],
    wrong: [
      { b: 1, a: 'w = w', trap: 'oop-self', why: '`w = w` only makes a local variable; the object needs `self.w`.' },
      { b: 2, a: 'w * h', trap: 'oop-self', why: 'w and h are not visible inside area; use `self.w` and `self.h`.' }],
    test: `
      assert Rect(3, 4).area() == 12
      r = Rect(2, 5)
      assert r.w == 2 and r.h == 5`,
    exp: 'Attributes live on `self`. A bare `w` inside `area` would be an undefined local name.' },

  'L11-14': {
    trap: 'super-init',
    blanks: [['super().__init__(s, s)', 'Rect.__init__(self, s, s)']],
    wrong: [
      { b: 1, a: 'super().__init__(s)', trap: 'super-init', why: 'Rect\'s constructor needs a width **and** a height: (s, s).' },
      { b: 1, a: 'self.s = s', trap: 'super-init', why: 'area uses self.w and self.h, which would never be set.' }],
    test: `
      sq = Square(5)
      assert sq.area() == 25 and isinstance(sq, Rect)`,
    exp: 'A square is a rectangle whose width and height are both `s`. `super()` reaches the superclass, and `self` is passed implicitly.' },

  'L11-15': {
    trap: 'operator-choice',
    blanks: [['self.n * o.d + o.n * self.d', 'o.n * self.d + self.n * o.d', 'self.n * o.d + self.d * o.n', 'o.d * self.n + o.n * self.d']],
    wrong: [
      { b: 1, a: 'self.n + o.n', trap: 'operator-choice', why: 'Adding numerators only works with equal denominators: 1/2 + 1/3 is not 2/6.' },
      { b: 1, a: '(self.n * o.d + o.n) * self.d', trap: 'precedence', mut: 'precedence:0' }],
    test: `
      assert str(Frac(1, 2) + Frac(1, 3)) == '5/6'
      assert str(Frac(2, 5) + Frac(1, 5)) == '15/25'`,
    exp: 'a/b + c/d = (a·d + c·b) / (b·d). It returns a **new** `Frac`, so neither operand is changed.' },

  'L11-16': {
    trap: 'polymorphism',
    ans: 'The same method call behaves differently depending on the object\'s actual class',
    wrong: [
      { a: 'A class can have only one method', trap: 'polymorphism', why: 'A class can have many methods; polymorphism is about the same call running different code.' },
      { a: 'A subclass copies the source code of its superclass', trap: 'polymorphism', why: 'A subclass inherits methods (it does not copy code), and polymorphism is about which version runs.' },
      { a: 'Objects cannot be changed after they are created', trap: 'polymorphism', why: 'That describes immutability, which is unrelated.' }],
    exp: 'E.g. `pet.speak()` in a loop over Pets, Dogs and Parrots runs a different `speak` for each, through the same interface.' },

  'L11-17': {
    trap: 'oop-self',
    ans: 'The particular instance the method was called on',
    wrong: [
      { a: 'The class itself', trap: 'oop-self', why: 'self is the particular object, which is why each instance keeps its own attributes.' },
      { a: 'The superclass', trap: 'oop-self', why: '`super()` reaches the superclass; self is the object itself.' },
      { a: 'A copy of the instance', trap: 'oop-self', why: 'No copy is made: changing `self.x` changes the real object.' }],
    exp: '`v1.length()` is really `MyVector.length(v1)`, so `self` is that same object, not a copy. That is why mutating `self.x` changes the object.' },

  'L11-18': {
    trap: 'alias',
    ans: '2',
    wrong: [
      { a: '1', trap: 'alias', why: '`self.members` refers to the same list as names, so the append shows in t.members.' },
      { a: '4', trap: 'append-extend', mut: 'append-extend:0' }],
    exp: 'The attribute stores a reference to the caller\'s list, not a copy, so later changes to `names` show through `t.members`. Use `members.copy()` to avoid this.' },

  'L11-19': {
    trap: 'int-div',
    ans: 'Now: 212.0F',
    wrong: [
      { a: 'TypeError', trap: 'str-dunder', why: '`str(Temp(100))` calls `__str__` and gives a string, so `+` works.' },
      { a: 'Now: 212F', trap: 'int-div', mut: 'int-div:0' }],
    exp: '`str(obj)` calls `__str__`. `/` gives a float, so the value is `212.0`.' },

  'L11-20': {
    trap: 'override',
    ans: 'CBA',
    wrong: [
      { a: 'CA', trap: 'override', mut: 'override:0' },
      { a: 'BA', trap: 'override', mut: 'override:1' }],
    exp: 'Each override adds its letter and then hands over to its superclass\'s version: C → B → A.' },

  'L11-21': {
    trap: 'override',
    ans: '[\'?\', \'moo\', \'moo\']',
    wrong: [
      { a: '[\'?\', \'moo\', \'?\']', trap: 'override', why: 'Calf inherits sound from Cow, the nearest class that defines it.' },
      { a: '[\'?\', \'?\', \'?\']', trap: 'override', mut: 'override:0' }],
    exp: '`Calf` defines nothing, so Python looks up the hierarchy and finds `Cow.sound` first.' },

  'L11-22': {
    trap: 'mutate-vs-new',
    ans: '2 4 3 6',
    wrong: [
      { a: '2 4 6 12', trap: 'mutate-vs-new', why: '`scaled` builds a new V from the values at that moment; scaling a later does not change b.' },
      { a: '1 2 3 6', trap: 'oop-self', why: '`scale` changes a itself through self.' }],
    exp: '`scaled` returns a new object and leaves `a` alone. `scale` mutates `a` in place, like the lecture\'s `normalize`.' },

  'L11-23': {
    trap: 'dunder-add',
    run: true,
    ans: 'Error!\nNone',
    wrong: [
      { a: 'TypeError', trap: 'dunder-add', why: '`__add__` handles the non-V case itself: it prints Error! and returns None.' },
      { a: '6', trap: 'dunder-add', why: '5 is not a V, so the else branch runs.' },
      { a: 'Error!', trap: 'missing-return', why: '`print(r)` also runs, and r is None because `__add__` returned nothing.' }],
    exp: 'Since 5 is not a `V`, `__add__` prints `Error!` and falls off the end, returning `None`. So `r` is `None`, and printing it shows `None`.' },

  'L11-24': {
    trap: 'super-init',
    blanks: [['super().__init__(name)', 'Fighter.__init__(self, name)'], ['super().attack(enemy)', 'Fighter.attack(self, enemy)', 'enemy.hp -= self.atk']],
    wrong: [
      { b: 1, a: 'self.name = name', trap: 'super-init', why: 'Then hp is never set. Reuse the parent constructor: `super().__init__(name)`.' },
      { b: 2, a: 'self.attack(enemy)', trap: 'override', why: 'That calls Berserker.attack again, forever. Call the parent version with super().' }],
    test: `
      b, f = Berserker('B'), Fighter('F')
      b.attack(f)
      b.attack(f)
      assert (f.hp, b.hp, b.name) == (50, 90, 'B')`,
    exp: 'Call the superclass constructor first so `name` and `hp` are set, then override `atk`. In `attack`, reuse the parent\'s attack (which uses `self.atk`, now 25) and then add the self-damage.' },

  'L11-25': {
    trap: 'override',
    ans: '11 20',
    wrong: [
      { a: '11 11', trap: 'override', mut: 'override:0' },
      { a: '12 20', trap: 'off-by-one', mut: 'index-off:0' }],
    exp: '`Chi` inherits `__init__`, but inside it `self.calc` is looked up on the actual object, a `Chi`, so the overriding `calc` runs even from the parent\'s constructor.' }
});
