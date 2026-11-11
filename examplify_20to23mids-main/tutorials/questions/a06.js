/* Assignment 6 — OOP: RPG characters (FITB)
   Converted from Assignment 6 Tasks 1A–1C. Every item is fill-in-the-blank.
   Minimal base classes are included so each item runs on its own. */
tutorial([
  {
    id: 'A6-01', src: 'A6', topic: 'Inheritance', d: 2, type: 'fib',
    t: 'Berserker',
    q: 'Complete `Berserker`. It is a `Fighter` costing 200 gold. While its hp is at most half its maximum, its strength becomes 200 (not double again), and it still attacks through `Fighter.act`.',
    code: `
      class Fighter:
          def __init__(self):
              self.name = 'Fighter'
              self.maxhp = 1200
              self.hp = 1200
              self.str = 100
              self.cost = 100
          def act(self, myTeam, enemy):
              pass

      class Berserker(Fighter):
          def __init__(self):
              super().__init__()
              self.cost = {{1}}
          def act(self, myTeam, enemy):
              if self.hp <= {{2}}:
                  self.str = {{3}}
              super().act(myTeam, enemy)`,
    blanks: [['200'], ['self.maxhp / 2'], ['200']],
    test: `
      b = Berserker()
      assert b.cost == 200
      assert b.str == 100
      b.hp = 600
      b.act([], [])
      assert b.str == 200
      b.act([], [])
      assert b.str == 200
      fresh = Berserker()
      fresh.hp = 700
      fresh.act([], [])
      assert fresh.str == 100`,
    exp: 'Reuse `Fighter.__init__` and override only the cost. The berserk check compares current hp with half of `maxhp`; assigning 200 (rather than doubling) stops the strength growing 100 → 200 → 400. Calling `super().act` keeps the inherited attack.'
  },
  {
    id: 'A6-02', src: 'A6', topic: 'Inheritance', d: 3, type: 'fib',
    t: 'ArchMage',
    q: 'Complete `ArchMage`. It is a `Mage` costing 600 gold. When it is the only living member of its own team it hits every living enemy for double its intelligence; otherwise it casts normally.',
    code: `
      class Mage:
          def __init__(self):
              self.name = 'Mage'
              self.maxhp = 800
              self.hp = 800
              self.int = 400
              self.cost = 200
              self.mana = 50
          def gotHurt(self, damage):
              self.hp -= damage
          def cast(self, myTeam, enemy):
              pass

      class ArchMage(Mage):
          def __init__(self):
              super().__init__()
              self.cost = 600
          def cast(self, myTeam, enemy):
              alive = []
              for c in myTeam:
                  if c.hp > 0:
                      alive.append(c)
              if {{1}}:
                  for e in enemy:
                      if e.hp > 0:
                          e.gotHurt({{2}})
              else:
                  super().cast(myTeam, enemy)`,
    blanks: [['len(alive) == 1'], ['self.int * 2']],
    test: `
      a = ArchMage()
      assert a.cost == 600
      e1, e2 = Mage(), Mage()
      a.cast([a], [e1, e2])
      assert e1.hp == 0 and e2.hp == 0
      e3 = Mage()
      ally = Mage()
      a.cast([a, ally], [e3])
      assert e3.hp == 800
      ally.hp = 0
      e4 = Mage()
      a.cast([a, ally], [e4])
      assert e4.hp == 0`,
    exp: 'Count only team members whose hp is above zero. Alone means exactly one survivor, which is the archmage itself. KABOOM deals `self.int * 2` to each living enemy, while every other case falls back to `Mage.cast` through `super()`.'
  },
  {
    id: 'A6-03', src: 'A6', topic: 'Inheritance', d: 3, type: 'fib',
    t: 'Necromancer',
    q: 'Complete `Necromancer`. It is a `Mage` costing 400 gold. With a dead teammate and enough mana it revives one at random with half its maximum hp (rounded down) instead of attacking.',
    code: `
      from random import randint

      manaCost = 20

      class Mage:
          def __init__(self):
              self.name = 'Mage'
              self.maxhp = 800
              self.hp = 800
              self.int = 400
              self.cost = 200
              self.mana = 50
          def cast(self, myTeam, enemy):
              pass

      class Necromancer(Mage):
          def __init__(self):
              super().__init__()
              self.cost = {{1}}
          def cast(self, myTeam, enemy):
              dead = []
              for c in myTeam:
                  if c.hp <= 0:
                      dead.append(c)
              if dead and self.mana >= manaCost:
                  target = dead[randint(0, len(dead) - 1)]
                  target.hp = {{2}}
                  self.mana -= manaCost
              else:
                  super().cast(myTeam, enemy)`,
    blanks: [['400'], ['target.maxhp // 2']],
    test: `
      n = Necromancer()
      assert n.cost == 400
      ally = Mage()
      ally.hp = 0
      n.cast([n, ally], [Mage()])
      assert ally.hp == 400
      assert n.mana == 30
      n.mana = 10
      ally.hp = 0
      n.cast([n, ally], [Mage()])
      assert ally.hp == 0 and n.mana == 10`,
    exp: 'Gather the dead first; the spell is possible only when that list is non-empty and mana is at least `manaCost`. Reviving uses half of the target\'s maximum hp, with `//` for the rounded-down integer. Without a target or enough mana, normal mage behaviour takes over.'
  },
  {
    id: 'A6-04', src: 'A6', topic: 'Inheritance', d: 1, type: 'fib',
    t: 'Inheriting from the right base',
    q: 'Complete the class header so an `ArchMage` is a kind of `Mage` and inherits its hp, mana and intelligence.',
    code: `
      class Mage:
          def __init__(self):
              self.name = 'Mage'
              self.maxhp = 800
              self.hp = 800
              self.int = 400
              self.cost = 200
              self.mana = 50

      class ArchMage({{1}}):
          def __init__(self):
              super().__init__()
              self.cost = 600`,
    blanks: [['Mage']],
    test: `
      a = ArchMage()
      assert isinstance(a, Mage)
      assert a.cost == 600
      assert a.maxhp == 800 and a.int == 400 and a.mana == 50`,
    exp: 'Put the parent class in the parentheses. Inheriting from `Mage` means `super().__init__()` sets the mage attributes, and only the cost needs to change.'
  }
]);
