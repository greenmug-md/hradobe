"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextstatus = exports.status = exports.Role = void 0;
const typeorm_1 = require("typeorm");
var Role;
(function (Role) {
    Role["CANDIDATE"] = "CANDIDATE";
    Role["COMPANY"] = "COMPANY";
})(Role = exports.Role || (exports.Role = {}));
var status;
(function (status) {
    status["DRAFT"] = "DRAFT";
    status["FINALIZED"] = "FINALIZED";
    status["APPROVED"] = "APPROVED";
    status["SIGNED"] = "SIGNED";
})(status = exports.status || (exports.status = {}));
var nextstatus;
(function (nextstatus) {
    nextstatus["FINALIZE"] = "FINALIZE";
    nextstatus["APPROVE"] = "APPROVE";
    nextstatus["SIGN"] = "SIGN";
})(nextstatus = exports.nextstatus || (exports.nextstatus = {}));
let ContractDB = class ContractDB {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], ContractDB.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, unique: true }),
    __metadata("design:type", String)
], ContractDB.prototype, "filename", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], ContractDB.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], ContractDB.prototype, "firstname", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], ContractDB.prototype, "lastname", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], ContractDB.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], ContractDB.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], ContractDB.prototype, "company", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], ContractDB.prototype, "statuscandidate", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], ContractDB.prototype, "statuscompany", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], ContractDB.prototype, "approvedcandidate", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], ContractDB.prototype, "approvedcompany", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], ContractDB.prototype, "signedcandidate", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], ContractDB.prototype, "signedcompany", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], ContractDB.prototype, "signeddocumentcandidate", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], ContractDB.prototype, "signeddocumentcompany", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], ContractDB.prototype, "transientid", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], ContractDB.prototype, "agreementid", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], ContractDB.prototype, "contractname", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], ContractDB.prototype, "role", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], ContractDB.prototype, "html", void 0);
ContractDB = __decorate([
    typeorm_1.Entity()
], ContractDB);
exports.default = ContractDB;
//# sourceMappingURL=ContractDB.js.map