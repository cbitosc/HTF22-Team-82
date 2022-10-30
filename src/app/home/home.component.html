<mat-tab-group mat-stretch-tabs>
  <mat-tab>
      <ng-template mat-tab-label>
          <mat-icon class="example-tab-icon">home</mat-icon>
          <strong>All Quizzes</strong>
        </ng-template><br>
    <mat-form-field appearance="outline">
        <mat-label>Search</mat-label>
        <input matInput [(ngModel)]="searchText" placeholder="Search Quiz by Name">
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>
    <div class="mat-elevation-z5">
    <table id="quizTable" class="table table-bordered table-hover">
      <thead class="p-3 mb-2 bg-primary text-white">
        <tr>
          <th class="pointer cols" scope="col" (click)="sort('name')">Quiz Title
            <i class="fa" [ngClass]="{'fa-sort': column != 'name', 'fa-sort-asc': (column == 'name' && isDesc), 'fa-sort-desc': (column == 'name' && !isDesc) }" aria-hidden="true"> </i>
          </th>
          <th class="cols" scope="col">Created By</th>
          <th class="pointer cols" scope="col" (click)="sort('popularity')">Popularity
            <i class="fa" [ngClass]="{'fa-sort': column != 'popularity', 'fa-sort-asc': (column == 'popularity' && isDesc), 'fa-sort-desc': (column == 'popularity' && !isDesc) }" aria-hidden="true"> </i>
          </th>
          <th class="pointer cols" scope="col" (click)="sort('createdOn')">Created On
              <i class="fa" [ngClass]="{'fa-sort': column != 'createdOn', 'fa-sort-asc': (column == 'createdOn' && isDesc), 'fa-sort-desc': (column == 'createdOn' && !isDesc) }" aria-hidden="true"> </i>
          </th>
          <th class="cols" scope="col">Max Marks</th>
          <th class="cols" *ngIf="!(currentUser.playerOrQm === 'QuizMaster')" scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let quiz of allQuiz  | search: searchText | orderby: {property: column, direction: direction}">
          <td>{{quiz.name}}</td>
          <td>{{quiz.createdBy}}</td>
          <td>{{quiz.popularity}}</td>
          <td>{{quiz.createdOn | customDate}}</td>
          <td>{{quiz.maxMarks}}</td>
          <td><button *ngIf="!(currentUser.playerOrQm === 'QuizMaster')" [disabled]="disableQuizAttempted(quiz.name)" class="btn btn-outline-primary btn-sm m-0" (click) = "takeQuiz(quiz.name)">Take Quiz</button></td>
        </tr>
      </tbody>
    </table>
    </div>
    <!-- <button *ngIf="!(currentUser.playerOrQm === 'Player')" class="fab-container" mat-fab color="primary" (click) ="addQuiz()">
        <mat-icon>add</mat-icon>
    </button> -->
    <div *ngIf="!(currentUser.playerOrQm === 'Player')">
    <app-speed-dial-fab></app-speed-dial-fab>
    </div>
  </mat-tab>
  <mat-tab>
      <ng-template mat-tab-label>
          <mat-icon class="example-tab-icon">dashboard</mat-icon>
          <strong>Scoreboard</strong>
        </ng-template><br>
    <mat-form-field class="example-chip-list">
      <mat-chip-list #chipList >
          <mat-chip
          *ngFor="let qname of quizNames"
          [selectable]="selectable"
          [removable]="removable"
          (removed)="remove(qname)"
          (selectionChange)="chipSelectionChanged()">
          {{qname}}
          <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
        </mat-chip>
        <input
          placeholder="Search Quiz"
          #quizNameInput
          [(ngModel)]="quizInputName"
          [formControl]="quizName"
          [matAutocomplete]="auto"
          [matChipInputFor]="chipList"
          [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
          [matChipInputAddOnBlur]="addOnBlur"
          (matChipInputTokenEnd)="add($event)">
      </mat-chip-list>
      <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selected($event)">
        <mat-option *ngFor="let qname of allQuizNames | searchName: quizInputName" [value]="qname">
          {{qname}}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
    <div class="mat-elevation-z5">
    <table class="table table-bordered table-hover">
      <thead class="p-3 mb-2 bg-primary text-white">
        <tr>
          <th class="cols" scope="col">Player ID</th>
          <th class="cols" scope="col">Player Name</th>
          <th class="cols" scope="col">Quiz Title</th>
          <th class="cols" scope="col">Attempted At</th>
          <th class="cols" scope="col">Score</th>
        </tr>
      </thead>
      <tbody *ngFor="let i of filteredQuizzes">
        <ng-container *ngFor="let player of i">
        <tr *ngFor="let p of player">
          <td>{{p.pid}}</td>
          <td>{{p.pname}}</td>
          <td>{{p.quizTitle}}</td>
          <td>{{p.attemptedAt | customDate}}</td>
          <td>{{p.score}}/{{p.answers.length}}</td>
        </tr>
      </ng-container>
      </tbody>
    </table> 
    </div> 
  </mat-tab>
  <mat-tab>
      <ng-template mat-tab-label>
          <mat-icon class="example-tab-icon">trending_up</mat-icon>
          <strong>Trending</strong>
        </ng-template><br>
    <mat-grid-list cols="2">
      <mat-grid-tile>
        <google-chart [type]="'BarChart'" [data]="quizPopularityData" [columnNames]="quizColumnNames" [title]="'Trending Quizzes'" [width]="700" [height]="700"></google-chart>
      </mat-grid-tile>
      <mat-grid-tile>
        <google-chart [type]="'ColumnChart'" [data]="quizSummaryData" [columnNames]="myColumnNames" [options]="myOptions" [title]="'Quiz Summary'" [width]="700" [height]="700"></google-chart>
      </mat-grid-tile>
    </mat-grid-list>
  </mat-tab>
</mat-tab-group>
