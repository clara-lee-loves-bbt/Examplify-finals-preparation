/* Tutorial 12 — Object-Oriented Programming
   Converted from AY26/27S1 Week 12 Tutorial Worksheet (BankAccount tasks). */
tutorial([
  {
    id: 'T12-01', src: 'T12', topic: 'Methods', d: 1, type: 'fib',
    t: 'Adding deposit()',
    q: 'Complete `deposit()` so that money is added to the account balance.',
    code: `
      class BankAccount:
          def __init__(self, name, balance):
              self.name = name
              self.balance = balance

          def withdraw(self, amount):
              if self.balance < amount:
                  print(f"Insufficient fund for withdrawal of \${amount}.")
                  return 0
              else:
                  self.balance -= amount
                  return amount

          def deposit(self, amount):
              {{1}}

          def show_balance(self):
              print(f"Account balance is \${self.balance}.")`,
    blanks: [['self.balance += amount', 'self.balance = self.balance + amount']],
    test: `
      a = BankAccount("Alice", 100)
      a.deposit(50)
      a.deposit(200)
      assert a.balance == 350
      assert a.withdraw(350) == 350
      assert a.balance == 0`,
    exp: 'The method needs the object it was called on, so it must take `self` and update `self.balance`. Nothing is returned; the sample run only checks the balance through `show_balance()`.'
  },
  {
    id: 'T12-02', src: 'T12', topic: 'Methods', d: 2, type: 'fib',
    t: 'Withdrawal security check',
    q: 'Complete the check and the successful branch of `withdraw(name, amount)`. A wrong name must print the message and return without changing the balance.',
    code: `
      class BankAccount:
          def __init__(self, name, balance):
              self.name = name
              self.balance = balance

          def withdraw(self, name, amount):
              if {{1}}:
                  print("You are not authorized for this account.")
                  return
              if self.balance < amount:
                  print(f"Insufficient fund for withdrawal of \${amount}.")
                  return 0
              else:
                  {{2}}
                  return amount

          def deposit(self, amount):
              self.balance += amount`,
    blanks: [['name != self.name'], ['self.balance -= amount', 'self.balance = self.balance - amount']],
    test: `
      a = BankAccount("Alice", 100)
      assert a.withdraw("John", 30) is None
      assert a.balance == 100
      assert a.withdraw("Alice", 30) == 30
      assert a.balance == 70
      assert a.withdraw("Alice", 100) == 0
      assert a.balance == 70`,
    exp: 'The account holder is stored in `self.name`; compare the supplied name with it before touching the balance. The authorised branch subtracts the amount and returns it, while the insufficient-funds branch returns 0.'
  },
  {
    id: 'T12-03', src: 'T12', topic: 'Attributes', d: 1, type: 'fib',
    t: 'Year-end interest',
    q: 'The constructor now stores the annual rate in `self.rate`. Complete `year_end_processing()` so the balance grows by that rate.',
    code: `
      class BankAccount:
          def __init__(self, name, balance, rate):
              self.name = name
              self.balance = balance
              self.rate = rate

          def year_end_processing(self):
              {{1}}`,
    blanks: [['self.balance *= 1 + self.rate', 'self.balance = self.balance * (1 + self.rate)']],
    test: `
      a = BankAccount("Alice", 100, 0.05)
      a.year_end_processing()
      assert abs(a.balance - 105.0) < 1e-9
      a.year_end_processing()
      assert abs(a.balance - 110.25) < 1e-9`,
    exp: 'A 5% increase multiplies the balance by 1.05. Using `self.rate` keeps the rate with the object, so each account can have its own interest rate.'
  },
  {
    id: 'T12-04', src: 'T12', topic: 'Inheritance', d: 3, type: 'fib',
    t: 'MinimumAccount',
    q: 'Complete `MinimumAccount`: a 10% rate, and a $20 fee (never below $0) before interest whenever the balance is under $1000.',
    code: `
      class BankAccount:
          def __init__(self, name, balance, rate):
              self.name = name
              self.balance = balance
              self.rate = rate

          def year_end_processing(self):
              self.balance *= 1 + self.rate

      class MinimumAccount(BankAccount):
          def __init__(self, name, balance):
              super().__init__({{1}})

          def year_end_processing(self):
              if self.balance < 1000:
                  self.balance = {{2}}
              {{3}}`,
    blanks: [['name, balance, 0.10'], ['max(self.balance - 20, 0)'], ['super().year_end_processing()']],
    test: `
      bob = MinimumAccount("Bob", 120)
      bob.year_end_processing()
      assert abs(bob.balance - 110.0) < 1e-9
      rich = MinimumAccount("Rich", 1000)
      rich.year_end_processing()
      assert abs(rich.balance - 1100.0) < 1e-9
      broke = MinimumAccount("Broke", 10)
      broke.year_end_processing()
      assert abs(broke.balance - 0.0) < 1e-9
      assert isinstance(bob, MinimumAccount) and isinstance(bob, BankAccount)`,
    exp: 'Pass the fixed 10% rate up to `BankAccount` with `super().__init__`. The fee is applied first and is floored at zero with `max`; then the inherited interest step runs. Reusing the parent method is what makes the subclass a true `BankAccount`.'
  },
  {
    id: 'T12-05', src: 'T12', topic: 'isinstance', d: 1, type: 'mcq',
    t: 'Which isinstance checks are True?',
    q: '`Bob_acc = MinimumAccount("Bob", 120)`, where `MinimumAccount` inherits from `BankAccount`. Which pair of results is printed?',
    code: `
      print(isinstance(Bob_acc, MinimumAccount), isinstance(Bob_acc, BankAccount))`,
    opts: ['True True', 'True False', 'False True', 'False False'],
    ans: 0,
    exp: 'A `MinimumAccount` is an instance of its own class **and** of every class it inherits from. Both checks are True.'
  },
  {
    id: 'T12-06', src: 'T12', topic: 'Attributes', d: 2, type: 'mcq',
    t: 'An attribute that was never stored',
    q: 'What happens when this runs?',
    code: `
      class BankAccount:
          def __init__(self, name, balance, rate):
              self.name = name
              self.balance = balance

          def year_end_processing(self):
              self.balance *= 1 + self.rate

      a = BankAccount("Alice", 100, 0.05)
      a.year_end_processing()`,
    opts: ['AttributeError', 'NameError', 'TypeError', 'It prints 100'],
    ans: 0,
    exp: 'The constructor receives `rate` but never assigns `self.rate = rate`, so the object has no `rate` attribute. Reading `self.rate` raises `AttributeError`.'
  },
  {
    id: 'T12-07', src: 'T12', topic: 'Composition', d: 2, type: 'fib',
    t: 'transfer_to()',
    q: 'Complete `transfer_to(other, amount)`. The transfer must go through the account security check, and the money must actually arrive in the other account.',
    code: `
      class BankAccount:
          def __init__(self, name, balance):
              self.name = name
              self.balance = balance

          def withdraw(self, name, amount):
              if name != self.name:
                  print("You are not authorized for this account.")
                  return
              if self.balance < amount:
                  print(f"Insufficient fund for withdrawal of \${amount}.")
                  return 0
              self.balance -= amount
              return amount

          def deposit(self, amount):
              self.balance += amount

          def transfer_to(self, other, amount):
              paid = {{1}}
              if paid:
                  {{2}}`,
    blanks: [['self.withdraw(self.name, amount)'], ['other.deposit(paid)']],
    test: `
      alice = BankAccount("Alice", 100)
      bob = BankAccount("Bob", 120)
      bob.transfer_to(alice, 50)
      assert bob.balance == 70
      assert alice.balance == 150
      broke = BankAccount("Broke", 10)
      broke.transfer_to(alice, 50)
      assert broke.balance == 10 and alice.balance == 150`,
    exp: 'Reusing `withdraw` keeps the authorisation and insufficient-funds rules in one place. Only transfer what was actually withdrawn, otherwise a failed withdrawal would still credit the other account.'
  },
  {
    id: 'T12-08', src: 'T12', topic: 'Inheritance', d: 2, type: 'mcq',
    t: 'Fee boundary at exactly $1000',
    q: 'What is the balance after one year-end processing?',
    code: `
      class BankAccount:
          def __init__(self, name, balance, rate):
              self.name = name
              self.balance = balance
              self.rate = rate
          def year_end_processing(self):
              self.balance *= 1 + self.rate

      class MinimumAccount(BankAccount):
          def __init__(self, name, balance):
              super().__init__(name, balance, 0.10)
          def year_end_processing(self):
              if self.balance < 1000:
                  self.balance = max(self.balance - 20, 0)
              super().year_end_processing()

      bob = MinimumAccount("Bob", 1000)
      bob.year_end_processing()
      print(bob.balance)`,
    opts: ['1100.0', '1080.0', '1000.0', '1078.0'],
    ans: 0,
    exp: 'The fee applies only when the balance is strictly less than 1000. At exactly 1000 there is no fee, so the balance simply grows by 10% to 1100.0.'
  }
]);
